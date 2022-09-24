import Block from "../../utils/Block";
import template from "./MessengerDialog.template.hbs";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import ChatsAPI from "../../api/ChatsAPI";

class MessengerDialog extends Block {
    constructor() {
        const input = new Input({
            className: "auth-input",
            name: "send",
            type: "text",
            value: "Сообщение"
        });
        const btn = new Button({
            text: "Отправить",
            className: "auth-btn"
        });
        super({
            input,
            btn
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessengerDialog;
