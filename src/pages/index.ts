import Router from "../utils/Router";

import Error404Page from "./404/index";
import Error500Page from "./500/index";
import LoginPage from "./login/index";
import RegisterPage from "./register/index";
import AccountPage from "./account/index";
import MessagesPage from "./messages/index";
// import * as pages from "./**/*.ts"

document.addEventListener("DOMContentLoaded", async () => {
    const router = new Router("#app");

    router
        .use("/", LoginPage)
        .use("/register", RegisterPage)
        .use("/account", AccountPage)
        .use("/messages", MessagesPage)
        .use("/500", Error500Page)
        .use("*", Error404Page)
        .start();
});
