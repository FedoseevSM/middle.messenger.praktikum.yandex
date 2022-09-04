import type { SignInData, SignUpData } from "../api/AuthAPI";
import AuthAPI from "../api/AuthAPI";
import store from "../utils/Store";
import Router from "../utils/Router";

export interface ControllerSignUpData extends SignUpData {
    confirm_password: string;
}

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signUp(data: ControllerSignUpData) {
        if (data.confirm_password !== data.password) {
            store.set("currentUser.error", "Passwords are not the same");

            return;
        }

        const { confirm_password, ...signUpData } = data;

        store.set("currentUser.isLoading", true);

        try {
            const response = await this.api.signUp(signUpData);
        } catch (e) {
            store.set("currentUser.error", response.reason);
            store.set("currentUser.isLoading", false);

            return;
        }

        if (response.reason) {
            store.set("currentUser.error", response.reason);

            return;
        }

        await this.fetchUser();

        const router = new Router();

        router.go("/account");
    }

    async signIn(data: SignInData) {
        await this.api.singIn(data);

        const router = new Router();

        router.go("/account");
    }

    async logout() {
        await this.api.logout();

        const router = new Router();

        router.go("/login");
    }

    async fetchUser() {
        const user = await this.api.read();

        store.set("currentUser", user);
    }
}

export default new AuthController();
