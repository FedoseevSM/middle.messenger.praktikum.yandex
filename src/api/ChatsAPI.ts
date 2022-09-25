import BaseAPI from "./BaseAPI";
import store, { FetchStatus } from "../utils/Store";
import Router from "../utils/Router";

export interface CreateChatData {
    title: string;
}

export interface DeleteChatData {
    chatId: number;
}

export interface UsersData {
    users: number [];
    chatId: number;
}

export default class ChatsAPI extends BaseAPI {
    create = undefined;
    update = undefined;
    delete = undefined;
    read = undefined;
    constructor() {
        super("/chats");
    }

    // Get chat
    getChats(): Promise<unknown> {
        return this.http.get("/");
    }

    // Create chat
    createChat(data: CreateChatData): Promise<unknown> {
        return this.http.post("/", data);
    }

    // Delete chat by ID
    deleteChat(data: DeleteChatData): Promise<unknown> {
        return this.http.delete("/", data);
    }

    // Add users to chat
    users(data: UsersData): Promise<unknown> {
        return this.http.put("/users", data);
    }

    getToken(data: string): Promise<unknown> {
        return this.http.post(`/token/${data}`);
    }

}
