import Block from "../../utils/Block";
import template from "../../layouts/empty/empty.template.hbs";

import { Link } from "../../components/Link/Link";

const props = {
    title: "Нет соединения",
    description: "500",
};

class Error500Page extends Block {
    constructor() {
        const link = new Link({
            children: "Назад к чатам",
            href: "/"
        });
        super({
            link
        });
    }
    render() {
        return this.compile(template, props);
    }
}

export default Error500Page;
