import Block from "../../utils/Block";
import template from "./messenger.template.hbs";

import MessengerSidebar from "../../components/MessengerSidebar/MessengerSidebar";
import MessengerDialog from "../../components/MessengerDialog/MessengerDialog";

import type { StoreData } from "../../utils/Store";
import { FetchStatus, withStore } from "../../utils/Store";
import store from "../../utils/Store";

import ChatsAPI from "../../api/ChatsAPI";

import AuthController from "../../controllers/AuthController";
import ChatsController from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";

const mapStateToProps = ({ chatsList, currentChatId }: StoreData) => ({
    currentChatId,
    chatsList
});

class MessengerPage extends Block {
    constructor() {
        const qwe = () => AuthController.getUser()
        setTimeout(qwe, 1000);
        const sidebar = new MessengerSidebar({});
        const dialog = new MessengerDialog();
        super({
            sidebar,
            dialog,
        });
    }

    render() {
        function requestMessages() {
            MessagesController.connect({
              userId: Number(localStorage.getItem('id')),
              chatId: Number(store.getState().currentChatId),
              token: localStorage.getItem('token'),
            });
          }

        if (this.props.currentChatId) {
            ChatsController.getToken()
            .then(() => {
                requestMessages()
            })
            const list: any = store.getState().chatsList;
            const id = this.props.currentChatId;
            const chat = list.find((chat: any) => chat.id == id);
            this.children.dialog.setProps({
                title: chat.title,
                chat: true
            });
        }
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerPage);
