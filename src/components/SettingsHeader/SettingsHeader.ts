import Block from "../../utils/Block";
import template from "./SettingsHeader.template.hbs";

class SettingsHeader extends Block {
    constructor() {

        super({
            
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SettingsHeader;
