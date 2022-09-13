import Block from "../../utils/Block";
import template from "./SettingsFooter.template.hbs";

import { Button } from "../../components/Button/Button";
import { Link } from "../../components/Link/Link";

import AuthController from "../../controllers/AuthController";

class SettingsFooter extends Block {
    constructor() {
        const handleSubmit = () => {
            AuthController.logout();
        };
        const logout = new Button({
            text: "Выйти",
            className: "logout-link",
            events: {
                click: handleSubmit,
            },
        });
        const changeData = new Link({
            children: "Изменить данные",
            href: "/settings",
            className: "settings-link",
            events: {
                click: {
                    handleSubmit
                },
            },
        });
        const changePassword = new Link({
            children: "Изменить пароль",
            href: "/settings",
            className: "settings-link",
            events: {
                click: {
                    handleSubmit
                },
            },
        });
        super({
            logout,
            changeData,
            changePassword
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SettingsFooter;
