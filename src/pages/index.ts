import '../styles/style.scss'

import Router from "../utils/Router";

import Error404Page from "./404/index";
import Error500Page from "./500/index";
import SignInPage from "./sign-in/index";
import SignUpPage from "./sign-up/index";
import SettingsPage from "./settings/index";
import MessengerPage from "./messenger/index";

document.addEventListener("DOMContentLoaded", async () => {
    const router = new Router("#app");

    router
        .use("/", SignInPage)
        .use("/sign-in", SignInPage)
        .use("/sign-up", SignUpPage)
        .use("/settings", SettingsPage)
        .use("/messenger", MessengerPage)
        .use("/500", Error500Page)
        .use("*", Error404Page)
        .start();
});
