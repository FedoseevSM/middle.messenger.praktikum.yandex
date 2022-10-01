import store from "../utils/Store";

export interface IMessageWebSocketConnect {
    userId: number;
    chatId: number;
    token: string;
}

export interface IMessageWebSocketGet {
    offset: number;
}

class MessagesController {
    private _ws: WebSocket;
    private _userId: number;
    private _chatId: number;
    private _token: string;
    private _ping: any;

    constructor() {
    }

    private _addEvents() {
        this._ws.addEventListener("open", this._handleOpen);
        this._ws.addEventListener("message", this._handleMessage);
        this._ws.addEventListener("error", this._handleError);
        this._ws.addEventListener("close", this._handleClose);
    }

    private _removeEvents() {
        this._ws.removeEventListener("open", this._handleOpen);
        this._ws.removeEventListener("message", this._handleMessage);
        this._ws.removeEventListener("error", this._handleError);
        this._ws.removeEventListener("close", this._handleClose);
    }

    private _handleOpen = () => {
        console.log("Соединение установлено");
        this.getMessages({ offset: 0 });
        this._ping = setInterval(() => {
            this._ws.send("");
        }, 1000);
    }

    private _handleMessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data);
        if (Array.isArray(data)) {
            store.set("messagesList", data.reverse());
        } else if (data.type !== "error") {
            const messagesList = store.getState().messagesList || [];
            store.set("messagesList", messagesList.concat([data]));
        }
    }

    private _handleError = (evt: ErrorEvent) => {
        console.log("Ошибка подключения", evt.message);
    }

    private _handleClose = (evt: CloseEventInit) => {
        this._removeEvents();
        if (evt.wasClean) {
            console.log("Соединение закрыто");
        } else {
            console.log("Проблемы с подключением");
        }
        console.log(`Код: ${evt.code}`);
        if (evt.code === 1006) {
            this._reconnection();
        }
    }

    private _reconnection() {
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token,
        });
    }

    public connect(options: IMessageWebSocketConnect) {
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        this._ws = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chatId}/${options.token}`
        );
        this._addEvents();
    }

    public getMessages(options: IMessageWebSocketGet) {
        this._ws.send(
            JSON.stringify({
                content: options.offset.toString(),
                type: "get old",
            })
        );
    }

    public leave() {
        if (this._ping) {
            clearInterval(this._ping);
        }
        if (!this._ws) {
            return;
        }
        this._ws.close();
        this._removeEvents();
    }

    public sendMessage(message: string) {
        this._ws.send(
            JSON.stringify({
                content: message,
                type: "message",
            })
        );
    }
}

export default new MessagesController();
