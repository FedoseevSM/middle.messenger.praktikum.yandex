import Block from "../../utils/Block";
import template from "./settings.template.hbs";

import SettingsHeader from "../../components/SettingsHeader/SettingsHeader";
import SettingsMain from "../../components/SettingsMain/SettingsMain";
import SettingsFooter from "../../components/SettingsFooter/SettingsFooter";

import { Link } from "../../components/Link/Link";

import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";

const mapStateToProps = ({ currentUser }: StoreData) => ({
    currentUser
});

class SettingsPage extends Block {
    constructor() {
        AuthController.getUser();
        const link = new Link({
            children: "<-",
            href: "/messenger",
            className: "back-btn",
        });
        const header = new SettingsHeader();
        const main = new SettingsMain();
        const footer = new SettingsFooter();
        super({
            link,
            header,
            main,
            footer
        });
    }

    render() {
        if (this.props.currentUser) {
        this.children.main.setProps({
            login: this.props.currentUser.login,
            firstName: this.props.currentUser.first_name,
            secondName: this.props.currentUser.second_name,
            displayName: this.props.currentUser.display_name,
            email: this.props.currentUser.email,
            phone: this.props.currentUser.phone,
        });
        }
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(SettingsPage);
