import Block from "../../utils/Block";
import template from "./RegularInput.template.hbs";

class RegularInput extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

export default RegularInput;
