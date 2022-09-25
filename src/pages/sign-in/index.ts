import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import SignInFooter from "../../components/SignInFooter/SignInFooter";
import SignInHeader from "../../components/SignInHeader/SignInHeader";
import SignInMain from "../../components/SignInMain/SignInMain";

import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";
import Router from "../../utils/Router";

import AuthController from "../../controllers/AuthController";
import type { SignInData } from "../../api/AuthAPI";

const mapStateToProps = ({
    currentUser
}: StoreData) => ({
    currentUser
});

class SignInPage extends Block {
    constructor() {
        AuthController.getUser();
        const handleSubmit = () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof SignInData] = input.value;
                if (input.value === "") {
                    return { login: null, password: null };
                }
                return acc;
            }, {} as Partial<SignInData>);

            AuthController.signIn(data as SignInData);
        };

        const main = new SignInMain({ title: "Авторизация" });
        const header = new SignInHeader({
            onSubmit: handleSubmit,
        });
        const footer = new SignInFooter();

        super({
            header,
            main,
            footer,
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

export default withStore(mapStateToProps)(SignInPage);