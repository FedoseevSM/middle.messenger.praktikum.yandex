import Block from "../../utils/Block";
import template from "./messenger.template.hbs";

import MessengerSidebar from "../../components/MessengerSidebar/MessengerSidebar";
import MessengerDialog from "../../components/MessengerDialog/MessengerDialog";

import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";

import ChatsController from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";
import AuthController from "../../controllers/AuthController";
import Router from "../../utils/Router";

interface ChatsListResponse {
    id?: number;
    title?: string;
}

const mapStateToProps = ({
    chatsList,
    currentChatId,
    currentToken,
    currentUser,
}: StoreData) => ({
    currentChatId,
    chatsList,
    currentToken,
    userId: currentUser?.id,
});

class MessengerPage extends Block {
    constructor(props = {}) {
        const sidebar = new MessengerSidebar({});
        const dialog = new MessengerDialog({});
        super({
            sidebar,
            dialog,
            ...props,
        });
    }

    componentDidMount() {
        ChatsController.getChats()
        const { userId } = this.props;

        if (userId) {
            return;
        }

        AuthController.getUser().catch(() => new Router("#app").go("/"));
    }

    handleFetchToken(currentChatId: string) {
        if (!currentChatId) {
            return;
        }

        ChatsController.getToken(currentChatId);
    }

    openSocket(token: string, chatId: number, userId: number) {
        MessagesController.leave();
        MessagesController.connect({
            userId,
            chatId,
            token,
        });
    }

    componentDidUpdate(prevProps: any, nextProps: any) {
        const { currentChatId: prevCurrentChatId, currentToken: prevToken } =
            prevProps;
        const {
            currentChatId: nextCurrentChatId,
            currentToken: nextToken,
            userId,
        } = nextProps;

        if (prevCurrentChatId != nextCurrentChatId) {
            this.handleFetchToken(nextCurrentChatId);
        }

        if (prevToken != nextToken) {
            this.openSocket(nextToken, nextCurrentChatId, userId);
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
