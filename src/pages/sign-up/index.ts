import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import RegisterHeader from "../../components/RegisterHeader/RegisterHeader";
import RegisterMain from "../../components/RegisterMain/RegisterMain";

import AuthController from "../../controllers/AuthController";
import type { SignUpData } from "../../api/AuthAPI";

class SignUpPage extends Block {
    constructor() {
        const handleSubmit = () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof SignUpData] = input.value;
                if (input.value == "") {
                    return {
                        first_name: "null",
                        second_name: "null",
                        login: "null",
                        email: "null@ya.ru",
                        password: "null",
                        phone: "79998664744",
                    };
                }
                return acc;
            }, {} as Partial<SignUpData>);

            AuthController.signUp(data as SignUpData);
        };

        const main = new RegisterMain({ title: "Регистрация" });
        const header = new RegisterHeader({
            onSubmit: handleSubmit,
        });

        super({
            header,
            main,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignUpPage;
