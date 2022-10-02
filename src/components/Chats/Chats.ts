import Block from "../../utils/Block";
import template from "./Chats.template.hbs";

import store, { StoreData } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";

export class Chats extends Block {
    constructor(props: StoreData) {
        const handleChatClick = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            const chatElement = target.closest(".message");
            const chatId = chatElement?.getAttribute("data-chat");
            if (chatId) {
                store.set("currentChatId", chatId);
            }
        };

        super({
            chats: props.chatsList,
            events: {
                click: handleChatClick,
            },
        });
    }

    render() {
        return this.compile(template, {
            chats: this.props.chats,
        });
    }
}

export default Chats;
