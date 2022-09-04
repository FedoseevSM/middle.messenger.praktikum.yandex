class EventBus {
    readonly listeners: Record<string, Function[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => void): void {
        this._checkEvent(event);
        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        this._checkEvent(event);
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }

    _checkEvent(event: string) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
    }
}

export default EventBus;
