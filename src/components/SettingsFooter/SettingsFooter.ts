import Block from "../../utils/Block";

import template from "./SettingsFooter.template.hbs";
import templateChangeData from "./ChangeDataFooter.template.hbs";
import templateChangePassword from "./ChangePasswordFooter.template.hbs";

import { Button } from "../Button/Button";

interface SettingsFooterProps {
    handleChangeData: Function;
    handleChangePassword: Function;
    handleSavePassword: Function;
    handleSaveData: Function;
    handleLogout: Function;
}

class SettingsFooter extends Block {
    constructor({
        handleChangeData,
        handleChangePassword,
        handleSavePassword,
        handleSaveData,
        handleLogout,
    }: SettingsFooterProps) {
        const logout = new Button({
            text: "Выйти",
            className: "logout-link",
            events: {
                click: handleLogout,
            },
        });
        const changeData = new Button({
            text: "Изменить данные",
            className: "settings-link",
            events: {
                click: handleChangeData,
            },
        });
        const changePassword = new Button({
            text: "Изменить пароль",
            className: "settings-link",
            events: {
                click: handleChangePassword,
            },
        });
        const saveData = new Button({
            text: "Сохранить",
            className: "save-btn",
            events: {
                click: handleSaveData,
            },
        });
        const savePassword = new Button({
            text: "Сохранить",
            className: "save-btn",
            events: {
                click: handleSavePassword,
            },
        });
        super({
            logout,
            changeData,
            changePassword,
            saveData,
            savePassword,
        });
    }

    render() {
        if (this.props.changeDataView) {
            return this.compile(templateChangeData, this.props);
        }
        if (this.props.changePasswordView) {
            return this.compile(templateChangePassword, this.props);
        }
        return this.compile(template, this.props);
    }
}

export default SettingsFooter;
