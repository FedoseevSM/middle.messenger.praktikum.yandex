import type { CreateChatData, DeleteChatData, UsersData } from "../api/ChatsAPI";
import ChatsAPI from "../api/ChatsAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";

class ChatsController {
    private api: ChatsAPI;
    private router: Router;

    constructor() {
        this.api = new ChatsAPI();
        this.router = new Router("#app");
    }

    async getChat() {
        try {
            await this.api.getChat();
        } catch (error) {
            return;
        }
    }

    async createChat(data: CreateChatData) {
        try {
            await this.api.createChat(data);
        } catch (error) {
            return;
        }
    }

    async deleteChat(data: DeleteChatData) {
        try {
            await this.api.deleteChat(data);
        } catch (error) {
            return;
        }
    }

    async users(data: UsersData) {
        try {
            await this.api.users(data);
        } catch (error) {
            return;
        }
    }

}

export default new ChatsController();
