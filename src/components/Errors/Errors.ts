import Block from "../../utils/Block";
import template from "./Errors.template.hbs";

export class Errors extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

