import Block from "../../utils/Block";
import template from "./MessengerSidebar.template.hbs";

import { ValidationType } from "../../utils/Validator";

import Modal from "../Modal/Modal";
import { LabelInput } from "../LabelInput/LabelInput";
import { Button } from "../Button/Button";

import { Chats } from "../Chats/Chats";

import ChatsAPI from "../../api/ChatsAPI";
import { CreateChatData } from "../../api/ChatsAPI";
import type { StoreData } from "../../utils/Store";
import { FetchStatus, withStore } from "../../utils/Store";
import store from "../../utils/Store";

import ChatsController from "../../controllers/ChatsController";

const mapStateToProps = ({ chatsList, currentChatId }: StoreData) => ({
    chatsList,
    currentChatId
});

class MessengerSidebar extends Block {
    constructor() {
        ChatsController.getChats();
        const input = new LabelInput({
            labelClassName: "auth-label",
            labelText: "Название чата",
            name: "password",
            type: "text",
            className: "auth-input",
            validationType: ValidationType.Any,
            message:
                "Значение должно быть типа строка",
        });
        const btn = new Button({
            text: "Отправить",
            className: "auth-btn"
        });
        const modal = new Modal({
            title: "Создать новый чат",
            content: input,
            button: btn,
        });
        const chats = new Chats();
        super({
            modal,
            chats,
            btn
        });
    }

    render() {
        const handleSubmit = async () => {
            const data: any = document.querySelector(".auth-input");
            await ChatsController.createChat({title: data.value} as CreateChatData);
            ChatsController.getChats();
            const modal: any = document.querySelector(".modal.active")
            const overlay: any = document.querySelector(".overlay")
            modal.classList.remove("active");
            overlay.classList.remove("active");
        };
        this.children.btn.setProps({
            events: {
                click: handleSubmit
            }
        });
        this.children.chats.setProps({
            chats: this.props.chatsList,
        });
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerSidebar);
