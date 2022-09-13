import type { SignInData, SignUpData } from "../api/AuthAPI";
import AuthAPI from "../api/AuthAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";

class AuthController {
    private api: AuthAPI;
    private router: Router;

    constructor() {
        this.api = new AuthAPI();
        this.router = new Router("#app");
    }

    async signUp(data: SignUpData) {
        store.set("registerStatus", FetchStatus.Loading);

        try {
            await this.api.signUp(data);
        } catch (err) {
            store.set("registerErrors", err.reason);
            store.set("registerStatus", FetchStatus.Rejected);

            return;
        }

        try {
            await this.getUser();
            this.router.go("/messenger");
        } catch (err) {}
    }

    async signIn(data: SignInData) {
        store.set("loginStatus", FetchStatus.Loading);
        try {
            await this.api.singIn(data);
            this.router.go("/messenger");
            store.set("loginStatus", FetchStatus.Fullfilled);
        } catch (err) {
            store.set("loginStatus", FetchStatus.Rejected);
            store.set("loginErrors", err.reason);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            this.router.go("/");
        } catch (err) {}
    }

    async getUser() {
        try {
            const user = await this.api.read();
            store.set("currentUser", user);
        } catch (err) {}
    }
}

export default new AuthController();
