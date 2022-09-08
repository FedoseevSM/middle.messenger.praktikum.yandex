import { LabelInput } from "../LabelInput/LabelInput";
import Block from "../../utils/Block";
import Validator, { ValidationType } from "../../utils/Validator";
import template from "./RegisterMain.template.hbs";

interface RegisterMainProps {
    title: string;
}
class RegisterMain extends Block {
    constructor({ title }: RegisterMainProps) {
        const firstNameInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Имя",
            name: "first_name",
            type: "text",
            className: "auth-input",
            validationType: ValidationType.Name,
        });

        const secondNameInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Фамилия",
            name: "second_name",
            type: "text",
            className: "auth-input",
            validationType: ValidationType.Name,
        });

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

        const emailInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Email",
            name: "email",
            type: "email",
            className: "auth-input",
            validationType: ValidationType.Email,
        });

        const phoneInput = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Телефон",
            name: "phone",
            type: "phone",
            className: "auth-input",
            validationType: ValidationType.Phone,
        });

        super({
            title,
            firstNameInput,
            secondNameInput,
            loginInput,
            passwordInput,
            emailInput,
            phoneInput,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default RegisterMain;
