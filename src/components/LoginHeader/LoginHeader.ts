import Block from "../../utils/Block";
import template from "./LoginHeader.template.hbs";

import { Button } from "../Button/Button";
import { Errors } from "../Errors/Errors";
import { FetchStatus, withStore } from "../../utils/Store";

interface LoginHeaderProps {
    onSubmit: (e: SubmitEvent) => void;
    loginErrors?: string;
    loginStatus?: FetchStatus;
}

const mapStateToProps = ({ loginStatus, loginErrors }: any) => ({
    loginStatus,
    loginErrors,
});

class LoginHeader extends Block {
    constructor({ onSubmit, ...props }: LoginHeaderProps) {
        const button = new Button({
            text: "Войти",
            events: {
                click: onSubmit,
            },
        });

        const errors = new Errors();

        super({
            button,
            errors,
            props,
        });
    }

    render() {
        this.children.errors.setProps({
            isValid: this.props.loginStatus !== FetchStatus.Rejected,
            text: this.props.loginErrors,
        });

        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(LoginHeader);
