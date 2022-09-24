import { LabelInput } from "../LabelInput/LabelInput";
import { ValidationType } from "../../utils/Validator";

import Block from "../../utils/Block";
import template from "./SettingsMain.template.hbs";
import templateChangeData from "./ChangeDataMain.template.hbs";
import templateChangePassword from "./ChangePasswordMain.template.hbs";

class SettingsMain extends Block {
    constructor() {
        // const firstNameInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Имя",
        //     name: "first_name",
        //     type: "text",
        //     className: "qwe",
        //     validationType: ValidationType.Name,
        //     message: "Допустимы символы латиницы и кириллицы, а также дефис",
        // });

        // const secondNameInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Фамилия",
        //     name: "second_name",
        //     type: "text",
        //     className: "auth-input",
        //     validationType: ValidationType.Name,
        //     message: "Допустимы символы латиницы и кириллицы, а также дефис",
        // });

        // const loginInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Логин",
        //     name: "login",
        //     type: "text",
        //     className: "auth-input",
        //     validationType: ValidationType.Login,
        //     message:
        //         "Логин должен состояить из латинских букв и цифр, также допустимы символы _ и -",
        // });

        // const passwordInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Пароль",
        //     name: "password",
        //     type: "password",
        //     className: "auth-input",
        //     validationType: ValidationType.Password,
        //     message:
        //         "Пароль должен содержать одну заглавную букву и одну цифру",
        // });

        // const emailInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Email",
        //     name: "email",
        //     type: "email",
        //     className: "auth-input",
        //     validationType: ValidationType.Email,
        //     message: "Некорректный адрес почты",
        // });

        // const phoneInput = new LabelInput({
        //     labelClassName: "auth-label",
        //     labelText: "Телефон",
        //     name: "phone",
        //     type: "phone",
        //     className: "auth-input",
        //     validationType: ValidationType.Phone,
        //     message: "Некорректный номер телефона",
        // });

        super({
            // firstNameInput,
            // secondNameInput,
            // loginInput,
            // passwordInput,
            // emailInput,
            // phoneInput,
        });
    }

    render() {
        if (this.props.changeDataView) {
            return this.compile(templateChangeData, this.props);
        } else if (this.props.changePasswordView) {
            return this.compile(templateChangePassword, this.props);
        } else {
            return this.compile(template, this.props);
        }
    }
}

export default SettingsMain;
