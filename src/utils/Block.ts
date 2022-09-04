import { nanoid } from "nanoid";
import EventBus from "./EventBus";

export type TProps = Record<string, any>;

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    public id = nanoid(6);
    protected props: any;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    // }
    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _element!: HTMLElement;
    private _meta: { tagName: string; props: any };

    constructor(tagName = "div", propsWithChildren: any = {}) {
        const eventBus = new EventBus();

        const { props, children } =
            this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            tagName,
            props,
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    componentDidMount() {}
    protected init() {}
    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) =>
            child.dispatchComponentDidMount()
        );
    }

    //   return true;
    get element() {
        return this._element;
    }

    // protected componentDidUpdate(oldProps: any, newProps: any) {
    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement("template");

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(
                `[data-id="${component.id}"]`
            );

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        });

        return temp.content;
    }
    _getChildrenAndProps(childrenAndProps: any) {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    // }
getContent() {
        return this.element;
    }
_addEvents() {
        const { events = {} } = this.props as {
            events: Record<string, () => void>;
        };

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        // eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    //   }
    show() {
        this.getContent()!.style.display = "block";
    }
    private _init() {
        this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    //     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
hide() {
        this.getContent()!.style.display = "none";
    }
_componentDidMount() {
        this.componentDidMount();
    }

    // private _componentDidUpdate(oldProps: any, newProps: any) {
    //   if (this.componentDidUpdate(oldProps, newProps)) {
    
    

    

    
    private _render() {
        const fragment = this.render();

        this._element!.innerHTML = "";

        this._element!.append(fragment);

        this._addEvents();
    }

    _makePropsProxy(props: any) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target };

                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    protected render(): DocumentFragment {
        return new DocumentFragment();
    }
}

export default Block;
