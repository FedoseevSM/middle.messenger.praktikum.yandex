import Block from "../../utils/Block";
import template from "./SignUpHeader.template.hbs";

import { Button } from "../Button/Button";
import { Errors } from "../Errors/Errors";
import type { StoreData } from "../../utils/Store";
import { FetchStatus, withStore } from "../../utils/Store";

interface SignUpHeaderProps {
    onSubmit: (e: SubmitEvent) => void;
    registerErrors?: string;
    registerStatus?: FetchStatus;
}

const mapStateToProps = ({ registerStatus, registerErrors }: StoreData) => ({
    registerStatus,
    registerErrors,
});

class SignUpHeader extends Block {
    constructor({ onSubmit, ...props }: SignUpHeaderProps) {
        const button = new Button({
            text: "Зарегистрироваться",
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
            isValid: this.props.registerStatus !== FetchStatus.Rejected,
            text: this.props.registerErrors,
            className: "alert",
        });

        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(SignUpHeader);
