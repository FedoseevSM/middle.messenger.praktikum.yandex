import BaseAPI from "./BaseAPI";

export interface CreateChatData {
    title: string;
}

interface CreateChatResponse {
    id: number;
}

export interface DeleteChatData {
    chatId: number;
}

export interface UsersData {
    users: number[];
    chatId: number;
}

interface GetTokenResponse {
    token: string;
}

export default class ChatsAPI extends BaseAPI {
    create = undefined;
    update = undefined;
    delete = undefined;
    read = undefined;
    constructor() {
        super("/chats");
    }

    getChats(): Promise<unknown> {
        return this.http.get("/");
    }

    createChat(data: CreateChatData): Promise<CreateChatResponse> {
        return this.http.post("/", data);
    }

    deleteChat(data: DeleteChatData): Promise<unknown> {
        return this.http.delete("/", data);
    }

    addUsers(data: UsersData): Promise<unknown> {
        return this.http.put("/users", data);
    }

    getToken(data: string): Promise<GetTokenResponse> {
        return this.http.post(`/token/${data}`);
    }
}
