import type {
    FindUserData,
    UserData,
    ChangePasswordData,
} from "../api/UsersAPI";
import UsersAPI from "../api/UsersAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";

class UsersController {
    private api: UsersAPI;
    private router: Router;

    constructor() {
        this.api = new UsersAPI();
        this.router = new Router("#app");
    }

    async findUser(data: FindUserData) {
        try {
            await this.api.findUser(data);
        } catch (error) {}
    }

    async user(data: UserData) {
        try {
            await this.api.changeUser(data);
        } catch (error) {}
    }

    async changePassword(data: ChangePasswordData) {
        try {
            await this.api.changePassword(data);
        } catch (error) {}
    }
}

export default new UsersController();
