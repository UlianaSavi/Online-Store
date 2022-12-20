import './index.scss';
import { App } from './ts/App';

console.log('Hello ts');

const root = document.querySelector('#root') as HTMLElement;
const app = new App(root);
app.init();
