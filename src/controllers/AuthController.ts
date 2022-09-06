import type { SignInData, SignUpData } from "../api/AuthAPI";
import AuthAPI from "../api/AuthAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";

export interface ControllerSignUpData extends SignUpData {
    confirm_password: string;
}

class AuthController {
    private api: AuthAPI;
    private router: Router;

    constructor() {
        this.api = new AuthAPI();
        this.router = new Router("#app");
    }

    async signUp(data: ControllerSignUpData) {
        if (data.confirm_password !== data.password) {
            store.set("currentUser.error", "Passwords are not the same");

            return;
        }

        const { confirm_password, ...signUpData } = data;

        store.set("currentUser.isLoading", true);

        try {
            await this.api.signUp(signUpData);
        } catch (err) {
            store.set("currentUser.error", err.reason);
            store.set("currentUser.isLoading", false);

            return;
        }

        try {
            await this.fetchUser();
            this.router.go("/account");
        } catch (err) {}
    }

    async signIn(data: SignInData) {
        store.set("loginStatus", FetchStatus.Loading);
        try {
            await this.api.singIn(data);
            this.router.go("/account");
            store.set("loginStatus", FetchStatus.Fullfilled);
        } catch (err) {
            store.set("loginStatus", FetchStatus.Rejected);
            store.set("loginErrors", err.reason);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            this.router.go("/login");
        } catch (err) {}
    }

    async fetchUser() {
        try {
            const user = await this.api.read();
            store.set("currentUser", user);
        } catch (err) {}
    }
}

export default new AuthController();
