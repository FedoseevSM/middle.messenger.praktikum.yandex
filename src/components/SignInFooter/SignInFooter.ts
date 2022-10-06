import Block from "../../utils/Block";
import template from "./SignInFooter.template.hbs";

import { Link } from "../Link/Link";

class SignInFooter extends Block {
    constructor() {
        const link = new Link({
            children: "Регистрация",
            href: "/sign-up",
            className: "auth-link",
        });
        super({
            link,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignInFooter;
