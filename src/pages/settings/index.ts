import Block from "../../utils/Block";
import template from "./settings.template.hbs";

import SettingsHeader from "../../components/SettingsHeader/SettingsHeader";
import SettingsMain from "../../components/SettingsMain/SettingsMain";
import SettingsFooter from "../../components/SettingsFooter/SettingsFooter";

import { Link } from "../../components/Link/Link";

import Router from "../../utils/Router";

import store from "../../utils/Store";
import type { StoreData } from "../../utils/Store";
import { withStore } from "../../utils/Store";

import AuthController from "../../controllers/AuthController";
import UsersController from "../../controllers/UsersController";

import type { UserData, ChangePasswordData } from "../../api/UsersAPI";

const mapStateToProps = ({
    currentUser,
    changeDataView,
    changePasswordView,
}: StoreData) => ({
    currentUser,
    changeDataView,
    changePasswordView,
});

class SettingsPage extends Block {
    constructor(props = {}) {
        const link = new Link({
            children: "<-",
            href: "/messenger",
            className: "back-btn",
        });
        const handleChangeData = () => {
            store.set("changePasswordView", false);
            store.set("changeDataView", true);
        };
        const handleSaveData = async () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof UserData] = input.value;
                if (input.value === "") {
                    return { login: null, password: null };
                }
                return acc;
            }, {} as Partial<UserData>);
            await UsersController.user(data as UserData);
            store.set("changeDataView", false);
            store.set("changePasswordView", false);
        };
        const handleChangePassword = () => {
            store.set("changeDataView", false);
            store.set("changePasswordView", true);
        };
        const handleSavePassword = async () => {
            const inputs = main.getContent().querySelectorAll("input");
            const data = Array.from(inputs).reduce((acc, input) => {
                acc[input.name as keyof ChangePasswordData] = input.value;
                if (input.value === "") {
                    return { oldPassword: "", newPassword: "" };
                }
                return acc;
            }, {} as Partial<ChangePasswordData>);
            await UsersController.changePassword(data as ChangePasswordData);
            store.set("changeDataView", false);
            store.set("changePasswordView", false);
        };
        const handleLogout = () => {
            AuthController.logout();
        };
        const header = new SettingsHeader();
        const main = new SettingsMain();
        const footer = new SettingsFooter({
            handleChangeData,
            handleChangePassword,
            handleSavePassword,
            handleSaveData,
            handleLogout,
        });
        super({
            link,
            header,
            main,
            footer,
            ...props,
        });
    }

    componentDidMount() {
        const { currentUser } = this.props;

        if (currentUser) {
            return;
        }

        AuthController.getUser().catch(() => new Router("#app").go("/"));
    }

    render() {
        const {
            login,
            first_name: firstName,
            second_name: secondName,
            display_name: displayName,
            email,
            phone,
        } = this.props.currentUser || {};
        this.children.main.setProps({
            changeDataView: this.props.changeDataView,
            changePasswordView: this.props.changePasswordView,
        });
        this.children.footer.setProps({
            changeDataView: this.props.changeDataView,
            changePasswordView: this.props.changePasswordView,
        });
        this.children.main.setProps({
            login,
            firstName,
            secondName,
            displayName,
            email,
            phone,
        });
        return this.compile(template, this.props);
    }
}

export default withStore(mapStateToProps)(SettingsPage);
