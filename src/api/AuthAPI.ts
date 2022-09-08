import BaseAPI from "./BaseAPI";

export interface SignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignInData {
    login: string;
    password: string;
}

export default class AuthAPI extends BaseAPI {
    create = undefined;
    update = undefined;
    delete = undefined;
    constructor() {
        super("/auth");
    }

    async signUp(data: SignUpData): Promise<unknown> {
        return await this.http.post("/signup", data);
    }

    singIn(data: SignInData): Promise<unknown> {
        return this.http.post("/signin", data);
    }

    logout(): Promise<unknown> {
        return this.http.post("/logout");
    }

    read(): Promise<unknown> {
        return this.http.get("/user");
    }
}
