import Error404Page from "./404";
import Error500Page from "./500";
import Router from '../utils/Router';

document.addEventListener('DOMContentLoaded', async () => {
const root = document.querySelector('#app')!;
const homePage = new Error500Page("div", { title: 'Home page', description: '500' });
root.append(homePage.getContent()!);

const router = new Router('');

router
  .use('/500', Error500Page)
  .start();

});