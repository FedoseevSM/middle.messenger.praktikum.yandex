import Block from "../../utils/Block";
import template from "./Button.template.hbs";

export class Button extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
