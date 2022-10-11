import type {
    CreateChatData,
    DeleteChatData,
    UsersData,
} from "../api/ChatsAPI";

import ChatsAPI from "../api/ChatsAPI";
import store from "../utils/Store";
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
            const chats = await this.api.getChats();
            if (chats === 0) {
                return;
            }
            return store.set("chatsList", chats);
        } catch (error) {
            throw error;
        }
    }

    async createChat(data: CreateChatData) {
        try {
            const response = await this.api.createChat(data);
            await this.getChats();
            store.set("currentChatId", response.id);
        } catch (error) {}
    }

    async deleteChat(data: DeleteChatData) {
        try {
            await this.api.deleteChat(data);
        } catch (error) {}
    }

    async users(data: UsersData) {
        try {
            await this.api.addUsers(data);
        } catch (error) {}
    }

    async getToken(chatId: string) {
        try {
            const response = await this.api.getToken(chatId);
            store.set("currentToken", response.token);
        } catch (error) {}
    }
}

export default new ChatsController();
