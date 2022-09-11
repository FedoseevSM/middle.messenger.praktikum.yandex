import Block from "../../utils/Block";
import template from "./SignInHeader.template.hbs";

import { Button } from "../Button/Button";
import { Errors } from "../Errors/Errors";
import type { StoreData } from "../../utils/Store";
import { FetchStatus, withStore } from "../../utils/Store";

interface SignInHeaderProps {
    onSubmit: (e: SubmitEvent) => void;
    loginErrors?: string;
    loginStatus?: FetchStatus;
}

const mapStateToProps = ({ loginStatus, loginErrors }: StoreData) => ({
    loginStatus,
    loginErrors,
});

class SignInHeader extends Block {
    constructor({ onSubmit, ...props }: SignInHeaderProps) {
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
            className: "alert",
        });

        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(SignInHeader);
