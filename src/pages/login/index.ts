import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import LoginFooter from "../../components/LoginFooter/LoginFooter";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginMain from "../../components/LoginMain/LoginMain";

import AuthController from "../../controllers/AuthController";
import type { SignInData } from "../../api/AuthAPI";

class LoginPage extends Block {
    constructor() {
        const handleSubmit = () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof SignInData] = input.value;
                return acc;
            }, {} as Partial<SignInData>);

            AuthController.signIn(data as SignInData);
        };

        const main = new LoginMain({ title: "Авторизация" });
        const header = new LoginHeader({
            onSubmit: handleSubmit,
        });
        const footer = new LoginFooter();

        super({
            header,
            main,
            footer,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default LoginPage;
