import Block from "../../utils/Block";
import template from "./Messages.template.hbs";

export class Messages extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Messages;
