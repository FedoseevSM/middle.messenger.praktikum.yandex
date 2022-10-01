import Block from "../../utils/Block";
import template from "./messenger.template.hbs";

import MessengerSidebar from "../../components/MessengerSidebar/MessengerSidebar";
import MessengerDialog from "../../components/MessengerDialog/MessengerDialog";

import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";

import ChatsController from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";

interface ChatsListResponse {
    id?: number;
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
        const { currentChatId: prevCurrentChatId, currentToken: prevToken } =
            prevProps;
        const { currentChatId: nextCurrentChatId, currentToken: nextToken } =
            nextProps;

        if (prevCurrentChatId != nextCurrentChatId) {
            this.handleFetchToken(nextCurrentChatId);
        }

        if (prevToken != nextToken) {
            this.openSocket(nextToken, nextCurrentChatId);
        }
    }

    render() {
        const { currentChatId, chatsList } = this.props;
        if (currentChatId) {
            const chat = chatsList.find(
                (chat: ChatsListResponse) => chat.id == currentChatId
            );
            this.children.dialog.setProps({
                title: chat.title,
                chat: true,
            });
        }
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(MessengerPage);
