import Block from "../../utils/Block";
import template from "./RegisterHeader.template.hbs";

import { Button } from "../Button/Button";
import { Errors } from "../Errors/Errors";
import { FetchStatus, withStore, StoreData } from "../../utils/Store";

interface RegisterHeaderProps {
    onSubmit: (e: SubmitEvent) => void;
    registerErrors?: string;
    registerStatus?: FetchStatus;
}

const mapStateToProps = ({ registerStatus, registerErrors }: StoreData) => ({
    registerStatus,
    registerErrors,
});

class RegisterHeader extends Block {
    constructor({ onSubmit, ...props }: RegisterHeaderProps) {
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

export default withStore(mapStateToProps)(RegisterHeader);
