import Error404Page from "./404";
import Error500Page from "./500";
import LoginPage from "./login";
import Router from "../utils/Router";
import RegisterPage from "./register";
import AccountPage from "./account";
import MessagesPage from "./messages";
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
