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

    async getChats() {
        try {
            let chats = await this.api.getChats();
            store.set("chatsList", chats)
        } catch (error) {
            return;
        }
    }

    async createChat(data: CreateChatData) {
        const response: any = await this.api.createChat(data);
        try {
            store.set("currentChatId", response.id)
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
