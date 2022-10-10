import Block from "../../utils/Block";
import template from "./Link.template.hbs";

import Router from "../../utils/Router";

interface LinkProps {
    href: string;
    children?: string;
    className?: string;
}

export class Link extends Block {
    constructor({ href, children, className }: LinkProps) {
        const router = new Router("#app");
        super({
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    router.go(href);
                },
            },
            children,
            className,
            href,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
