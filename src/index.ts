import './index.scss';
import { App } from './ts/App';

const root = document.querySelector('#root') as HTMLElement;
const app = new App(root);
app.init();