import Block from "../../utils/Block";
import template from "./LoginFooter.template.hbs";

import { Link } from "../Link/Link";

class LoginFooter extends Block {
    constructor() {
        const link = new Link({
            children: "Регистрация",
            href: "/register",
            className: "auth-link"
        });
        super({
            link
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}

export default LoginFooter;
