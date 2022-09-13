import BaseAPI from "./BaseAPI";

export interface FindUserData {
    login: string;
}

export interface UserData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export default class UsersAPI extends BaseAPI {
    create = undefined;
    update = undefined;
    delete = undefined;
    read = undefined;
    constructor() {
        super("/user");
    }

    // Search for user by login (max 10)
    findUser(data: FindUserData): Promise<unknown> {
        return this.http.post("/search", data);
    }

    // Change user profile
    user(data: UserData): Promise<unknown> {
        return this.http.put("/profile", data);
    }

    // Change user password
    changePassword(data: ChangePasswordData): Promise<unknown> {
        return this.http.put("/password", data);
    }

}
