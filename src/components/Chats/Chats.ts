import Block from "../../utils/Block";
import template from "./Chats.template.hbs";

import store from "../../utils/Store";

export class Chats extends Block {
    constructor() {
        super({});
    }
    render() {
        const handleChat = () => {
            const chats: any = document.querySelectorAll(".message");

            chats.forEach(function (item: any) {
                item.addEventListener("click", function (e: any) {
                    e.preventDefault();
                    const chatId = this.getAttribute("data-chat");
                    store.set("currentChatId", chatId)
                    const chat: any = document.querySelector(
                        '.message[data-chat="' + chatId + '"]'
                    );
                chat.classList.add("active");
                });
            });
        };

        setTimeout(handleChat, 0);
        return this.compile(template, this.props);
    }
}

export default Chats;
