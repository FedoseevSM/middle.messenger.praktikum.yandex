import Error404Page from "./404";
import Error500Page from "./500";
import LoginPage from "./login";
import Router from '../utils/Router';
import RegisterPage from "./register";

document.addEventListener('DOMContentLoaded', async () => {

const router = new Router('#app');

router
  .use('/', LoginPage)
  .use('/register', RegisterPage)
  .use('/500', Error500Page)
  .use('/404', Error404Page)
  .start();

});