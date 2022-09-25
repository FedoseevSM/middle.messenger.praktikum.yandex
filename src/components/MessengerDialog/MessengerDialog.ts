import Block from "../../utils/Block";
import template from "./MessengerDialog.template.hbs";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import Messages from "../Messages/Messages";

import MessagesController from "../../controllers/MessagesController";

import { FetchStatus, withStore } from "../../utils/Store";
import { StoreData } from "../../utils/Store";
import store from "../../utils/Store";

const mapStateToProps = ({ messagesList }: StoreData) => ({
    messagesList
});

class MessengerDialog extends Block {
    constructor() {
        const handleSend = async () => {
            const data: any = document.querySelector(".auth-input-test");
            await MessagesController.sendMessage(data.value);
        };
        const input = new Input({
            className: "auth-input-test",
            name: "send",
            type: "text",
            value: "Сообщение"
        });
        const btn = new Button({
            text: "Отправить",
            className: "auth-btn",
            events: {
                click: handleSend
            }
        });
        const messages = new Messages()
        super({
            input,
            btn,
            messages
        });
    }

    render() {
        this.children.messages.setProps({
            messages: this.props.messagesList
        });
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerDialog);
