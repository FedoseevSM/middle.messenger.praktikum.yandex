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

interface User {
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

interface StoreData {
    currentUser?: User;
    loginStatus: FetchStatus;
    loginErrors: ApiError | null;
    registerStatus: FetchStatus;
    registerErrors: ApiError | null;
}

export class Store extends EventBus {
    private state: StoreData = {
        loginStatus: FetchStatus.Idle,
        loginErrors: null,
        registerStatus: FetchStatus.Idle,
        registerErrors: null,
    };

    public getState() {
        return this.state;
    }

    public set(path: _ResourcePath<StoreData>, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

const store = new Store();

export const withStore =
    (mapStateToProps: (state: StoreData) => Record<string, unknown>) =>
    (Component: typeof Block) => {
        let state: any;

        return class extends Component {
            constructor(props: any) {
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
