import Block from "../../utils/Block";
import template from "../../layouts/empty/empty.template.hbs";

import { Link } from "../../components/Link/Link";

const props = {
    title: "Страница не найдена",
    description: "404",
};

class Error404Page extends Block {
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

export default Error404Page;
