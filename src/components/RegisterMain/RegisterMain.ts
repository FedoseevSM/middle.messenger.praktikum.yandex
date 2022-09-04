import Block from "../../utils/Block";
import template from "./RegisterMain.template.hbs";

class RegisterMain extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

export default RegisterMain;
