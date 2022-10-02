import { isEqual, set } from "./Helpers";
import EventBus from "./EventBus";
import type Block from "./Block";

type __ResourcePath<T, Key extends keyof T> = Key extends string
    ? T[Key] extends Record<string, unknown>
        ?
              | `${Key}.${__ResourcePath<
                    T[Key],
                    Exclude<keyof T[Key], keyof unknown[]>
                > &
                    string}`
              | `${Key}.${Exclude<keyof T[Key], keyof unknown[]> & string}`
        : never
    : never;

type _ResourcePath<T> = __ResourcePath<T, keyof T> | keyof T | string;

export enum StoreEvents {
    Updated = "updated",
}

export enum FetchStatus {
    Idle = "idle",
    Loading = "loading",
    Fullfilled = "fullfilled",
    Rejected = "rejected",
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ApiError {
    reason: string;
}

export interface StoreData {
    currentUser?: User | null;
    loginStatus?: FetchStatus;
    loginErrors?: ApiError | null;
    registerStatus?: FetchStatus;
    registerErrors?: ApiError | null;
    changeDataView?: boolean;
    changePasswordView?: boolean;
    chatsList?: Array<{}>;
    messagesList?: Array<{}>;
    currentChat?: object;
    currentChatId: null | number;
    currentToken: null | number;
}

const initialState: StoreData = {
    loginStatus: FetchStatus.Idle,
    loginErrors: null,
    registerStatus: FetchStatus.Idle,
    registerErrors: null,
    currentUser: null,
    changeDataView: false,
    changePasswordView: false,
    chatsList: [],
    currentChat: {},
    currentChatId: null,
    messagesList: [],
    currentToken: null,
}

export class Store extends EventBus {
    private state = { ...initialState };

    public getState() {
        return this.state;
    }

    public set(path: _ResourcePath<StoreData>, value: unknown) {
        set(this.state, path, value);
        this.on(StoreEvents.Updated, () => {});
        this.emit(StoreEvents.Updated);
    }

    public reset() {
        this.state = initialState;
        this.emit(StoreEvents.Updated);
    }
}

const store = new Store();

export const withStore =
    (mapStateToProps: (state: StoreData) => Record<string, unknown>) =>
    (Component: typeof Block) => {
        let state: Record<string, unknown>;

        return class extends Component {
            constructor(props: object) {
                state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({
                            ...newState,
                        });
                    }
                });
            }
        };
    };

export default store;
