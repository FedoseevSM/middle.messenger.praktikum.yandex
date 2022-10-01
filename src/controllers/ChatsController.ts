import type {
    CreateChatData,
    DeleteChatData,
    UsersData,
} from "../api/ChatsAPI";
import ChatsAPI from "../api/ChatsAPI";
import store from "../utils/Store";
import Router from "../utils/Router";

interface CreateChatResponse {
    id?: number;
}

interface GetTokenResponse {
    token?: string;
}

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
            store.set("chatsList", chats);
        } catch (error) {
            return;
        }
    }

    async createChat(data: CreateChatData) {
        const response = await this.api.createChat(data) as CreateChatResponse;
        try {
            store.set("currentChatId", response.id as CreateChatResponse);
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
            await this.api.addUsers(data);
        } catch (error) {
            return;
        }
    }

    async getToken(chatId: string) {
        try {
            const response = await this.api.getToken(chatId) as GetTokenResponse;
            store.set("currentToken", response.token as GetTokenResponse);
        } catch (error) {
            return;
        }
    }
}

export default new ChatsController();
