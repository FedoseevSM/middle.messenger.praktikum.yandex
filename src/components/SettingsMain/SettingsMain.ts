import Block from "../../utils/Block";
import template from "./SettingsMain.template.hbs";

class SettingsMain extends Block {
    constructor() {
        super({
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SettingsMain;
