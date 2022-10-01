import Block from "../../utils/Block";
import template from "./MessengerDialog.template.hbs";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import Messages from "../Messages/Messages";

import MessagesController from "../../controllers/MessagesController";

import { withStore, StoreData } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";

const mapStateToProps = ({
    messagesList,
    currentChatId,
    currentToken,
}: StoreData) => ({
    messagesList,
    currentChatId,
    currentToken,
});

interface dataModal {
    value?: string;
}

class MessengerDialog extends Block {
    constructor() {
        AuthController.getUser()
        const handleSend = async () => {
            const data = document.querySelector(".auth-input-test") as dataModal;
            await MessagesController.sendMessage(data.value as string);
        };
        const input = new Input({
            className: "auth-input-test",
            name: "send",
            type: "text",
            placeholder: "Сообщение",
        });
        const btn = new Button({
            text: "Отправить",
            className: "auth-btn",
            events: {
                click: handleSend,
            },
        });
        const messages = new Messages();
        super({
            input,
            btn,
            messages,
        });
    }

    render() {
        this.children.messages.setProps({
            messages: this.props.messagesList,
        });
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerDialog);
