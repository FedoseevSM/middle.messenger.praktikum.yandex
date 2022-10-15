import { assert } from "chai";
import type { User } from "./Store";
import store from "./Store";

const user: User = {
    id: 1,
    first_name: "name",
    second_name: "family",
    display_name: "nickname",
    login: "login",
    email: "email@ya.ru",
    phone: "+79991234567",
    avatar: "./avatar/avatar.png",
};

describe("Store", () => {
    it("Should be empty User on startup", () => {
        assert.equal(
            store!.getState().currentUser,
            null,
            "!= typeof null to equal"
        );
    });

    it("Set and check equal User value in Store", () => {
        store!.set("currentUser", user);
        assert.equal(
            store!.getState().currentUser,
            user,
            "!= coerces values to equal"
        );
    });
});
