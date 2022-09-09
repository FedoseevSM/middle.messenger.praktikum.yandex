import Block from "../../utils/Block";
import template from "./account.template.hbs";

import { Button } from "../../components/Button/Button";
import { Link } from "../../components/Link/Link";

import AuthController from "../../controllers/AuthController";

const props = {
    title: "Профиль",
    description: "404",
};

class AccountPage extends Block {
    constructor() {
        const handleSubmit = () => {
            AuthController.logout();
        };
        const logout = new Button({
            text: "Выйти",
            events: {
                click: handleSubmit,
            },
        });
        const link = new Link({
            children: "<-",
            href: "/messages",
            className: "back-btn",
        });
        super({
            logout,
            link,
        });
    }

    render() {
        return this.compile(template, props);
    }
}

export default AccountPage;
