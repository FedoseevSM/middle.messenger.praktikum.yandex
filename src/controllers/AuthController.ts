import type { SignInData, SignUpData } from "../api/AuthAPI";
import AuthAPI from "../api/AuthAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";
import type { User } from "../utils/Store";
import MessagesController from "./MessagesController";

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
            MessagesController.leave();
            await this.api.logout();
            this.router.go("/");
        } catch (err) {}
    }

    async getUser() {
        try {
            const user = (await this.api.read()) as User;
            store.set("currentUser", user);
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthController();
