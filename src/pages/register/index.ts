import Block from "../../utils/Block";
import template from "../../layouts/auth/auth.template.hbs";

import RegisterMain from "../../components/RegisterMain/RegisterMain";
import RegisterHeader from "../../components/RegisterHeader/RegisterHeader";

const props = {
    title: "Регистрация",
};

class RegisterPage extends Block {
    init() {
        this.children.header = new RegisterHeader();

        this.children.main = new RegisterMain(props);
    }

    render() {
        return this.compile(template, props);
    }
}

export default RegisterPage;
