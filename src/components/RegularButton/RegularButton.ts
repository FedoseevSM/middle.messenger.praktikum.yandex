import Block from "../../utils/Block";
import template from "./RegularButton.template.hbs";

class RegularButton extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

export default RegularButton;
