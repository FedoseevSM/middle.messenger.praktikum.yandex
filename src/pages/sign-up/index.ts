import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import SignUpHeader from "../../components/SignUpHeader/SignUpHeader";
import SignUpMain from "../../components/SignUpMain/SignUpMain";

import AuthController from "../../controllers/AuthController";
import type { SignUpData } from "../../api/AuthAPI";

import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";
import Router from "../../utils/Router";

import type { SignInData } from "../../api/AuthAPI";

const mapStateToProps = ({
    currentUser
}: StoreData) => ({
    currentUser
});

class SignUpPage extends Block {
    constructor() {
        AuthController.getUser();
        const handleSubmit = () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof SignUpData] = input.value;
                if (input.value === "") {
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

        const main = new SignUpMain({ title: "Регистрация" });
        const header = new SignUpHeader({
            onSubmit: handleSubmit,
        });

        super({
            header,
            main,
        });
    }

    render() {
        const renderView = () => {
            if (this.props.currentUser) {
                const router = new Router("#app");
                return router.go("/messenger");
            }
        };
        setTimeout(renderView, 0);
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(SignUpPage);
