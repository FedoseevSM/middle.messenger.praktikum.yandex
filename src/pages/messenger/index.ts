import Block from "../../utils/Block";
import template from "./messenger.template.hbs";

import MessengerSidebar from "../../components/MessengerSidebar/MessengerSidebar";
import MessengerDialog from "../../components/MessengerDialog/MessengerDialog";

import type { StoreData } from "../../utils/Store";
import store, { withStore } from "../../utils/Store";

import ChatsController from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";

interface ChatsListResponse {
    id?: number;
    title?: string;
}

const mapStateToProps = ({
    chatsList,
    currentChatId,
    currentToken,
}: StoreData) => ({
    currentChatId,
    chatsList,
    currentToken,
});

class MessengerPage extends Block {
    constructor() {
        const sidebar = new MessengerSidebar({});
        const dialog = new MessengerDialog({});
        super({
            sidebar,
            dialog,
        });
    }

    async componentDidMount() {
        ChatsController.getChats();
        const { currentChatId } = this.props;

        if (!currentChatId) {
            return;
        }

        await ChatsController.getToken(currentChatId);
    }

    handleFetchToken(currentChatId: string) {
        if (!currentChatId) {
            return;
        }

        ChatsController.getToken(currentChatId);
    }

    openSocket(token: string, chatId: number) {
        MessagesController.leave();
        MessagesController.connect({
            userId: Number(localStorage.getItem("id")),
            chatId: chatId,
            token: token,
        });
    }

    componentDidUpdate(prevProps: any, nextProps: any) {
        const {
            currentChatId: prevCurrentChatId,
            currentToken: prevToken,
            chatsList: prevchatsList,
        } = prevProps;
        const {
            currentChatId: nextCurrentChatId,
            currentToken: nextToken,
            chatsList: nextchatsList,
        } = nextProps;

        if (prevCurrentChatId != nextCurrentChatId) {
            this.handleFetchToken(nextCurrentChatId);
        }

        if (prevToken != nextToken) {
            this.openSocket(nextToken, nextCurrentChatId);
        }
        if (!store.getState().currentChatId) {
            return;
        } else {
            let chatsList = store.getState().chatsList;
            const chat = chatsList?.find(
                (chat: ChatsListResponse) =>
                    chat.id == store.getState().currentChatId
            ) as ChatsListResponse;
            this.children.dialog.setProps({
                title: chat.title,
                chat: true,
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerPage);
