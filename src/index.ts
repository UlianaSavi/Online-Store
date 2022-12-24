import './index.scss';
import '../node_modules/metro4-dist/js/metro.min.js';
import { App } from './ts/App';

console.log('Hello ts');

const root = document.querySelector('#root') as HTMLElement;
const app = new App(root);
app.init();
