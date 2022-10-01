import { LabelInput } from "../LabelInput/LabelInput";
import { ValidationType } from "../../utils/Validator";

import Block from "../../utils/Block";
import template from "./SettingsMain.template.hbs";
import templateChangeData from "./ChangeDataMain.template.hbs";
import templateChangePassword from "./ChangePasswordMain.template.hbs";

class SettingsMain extends Block {
    constructor() {
        super();
    }

    render() {
        if (this.props.changeDataView) {
            return this.compile(templateChangeData, this.props);
        }
        if (this.props.changePasswordView) {
            return this.compile(templateChangePassword, this.props);
        }
        return this.compile(template, this.props);
    }
}

export default SettingsMain;
