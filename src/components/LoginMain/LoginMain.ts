import { LabelInput } from "../LabelInput/LabelInput";
import Block from "../../utils/Block";
import Validator, { ValidationType } from "../../utils/Validator";
import template from "./LoginMain.template.hbs";

interface LoginMainProps {
    title: string;
}
class LoginMain extends Block {
    constructor({ title }: LoginMainProps) {
        const loginInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Логин",
            name: "login",
            type: "text",
            className: "auth-input",
            validationType: ValidationType.Login,
        });

        const passwordInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Пароль",
            name: "password",
            type: "password",
            className: "auth-input",
            validationType: ValidationType.Password,
        });

        super({
            title,
            loginInput,
            passwordInput,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default LoginMain;
