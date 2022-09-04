import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import LoginFooter from "../../components/LoginFooter/LoginFooter";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginMain from "../../components/LoginMain/LoginMain";

const props = {
    title: "Авторизация",
};

class LoginPage extends Block {
    init() {
        this.children.header = new LoginHeader();

        this.children.main = new LoginMain("div", props);

        this.children.footer = new LoginFooter();
    }

    render() {
        console.log("Привет мир!");
        return this.compile(template, props);
    }
}

export default LoginPage;
