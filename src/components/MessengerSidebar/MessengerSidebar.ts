import Block from "../../utils/Block";
import template from "./MessengerSidebar.template.hbs";

import Modal from "../Modal/Modal";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { Chats } from "../Chats/Chats";

import { CreateChatData } from "../../api/ChatsAPI";
import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";

import ChatsController from "../../controllers/ChatsController";

const mapStateToProps = ({ chatsList, currentChatId }: StoreData) => ({
    chatsList,
    currentChatId,
});

interface HandleSubmitData {
    value?: string;
}

class MessengerSidebar extends Block {
    constructor() {
        const input = new Input({
            name: "password",
            type: "text",
            className: "auth-input",
            placeholder: "Название"
        });
        const btn = new Button({
            text: "Отправить",
            className: "auth-btn",
        });
        const modal = new Modal({
            title: "Создать новый чат",
            content: input,
            button: btn,
        });
        const chats = new Chats({
            chatsList: [],
            currentChatId: null,
            currentToken: null,
        });

        super({
            modal,
            chats,
            btn,
        });
    }

    componentDidMount(): void {
        ChatsController.getChats();
    }

    render() {
        const handleSubmit = async () => {
            const data = document.querySelector(".auth-input") as HandleSubmitData;
            await ChatsController.createChat({
                title: data.value,
            } as CreateChatData);
            ChatsController.getChats();
            const modal = document.querySelector(".modal.active")!;
            const overlay = document.querySelector(".overlay")!;
            modal.classList.remove("active");
            overlay.classList.remove("active");
        };
        this.children.btn.setProps({
            events: {
                click: handleSubmit,
            },
        });
        this.children.chats.setProps({
            chats: this.props.chatsList,
            currentChatId: this.props.currentChatId,
        });
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerSidebar);

