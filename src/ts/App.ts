import { Model } from './models/model';
import { IAppState } from './types';
import { START_PAGE } from './contains';
import { create } from './utils/create';
import { Header } from './components/Header/Header';
import { PageMain } from './components/PageMain/PageMain';
import { Footer } from './components/Footer/Footer';
import { Router } from './Router/Router';
import { PageFilter } from './components/PageFilter/PageFilter';
import { Page404 } from './components/Page404/Page404';

export class App {
  BASE_STATE: IAppState = {
    page: {
      currentPage: START_PAGE
    },
    count: {
      count: 0
    }
  };
  header: HTMLElement | null;
  main: HTMLElement | null;
  footer: HTMLElement | null;
  root: HTMLElement;
  router: Router | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.header = null;
    this.main = null;
    this.footer = null;
    this.router = null;
  }

  createDefaultLayer = () => {
    this.header = create({
      tagName: 'header',
      dataAttr: [['id', 'header']],
      parent: this.root
    });
    this.main = create({
      tagName: 'main',
      dataAttr: [['id', 'main']],
      parent: this.root
    });
    this.footer = create({
      tagName: 'footer',
      dataAttr: [['id', 'footer']],
      parent: this.root
    });
  };

  init = () => {
    this.createDefaultLayer();

    const model = new Model(this.BASE_STATE);

    // Static components
    const header = new Header(this.header);
    header.mount();
    const footer = new Footer(this.footer);
    footer.mount();
    const pageMain = new PageMain(this.main);
    const pageFilter = new PageFilter(this.main);
    const page404 = new Page404(this.main);

    const routes = {
      '404': {
        mount: page404.mount,
        unmount: page404.unmount
      },
      '/': {
        mount: pageMain.mount,
        unmount: pageMain.unmount
      },
      '/filter': {
        mount: pageFilter.mount,
        unmount: pageFilter.unmount
      }
    };

    // Dinamic components

    model.fire();
    this.router = new Router(this.main, routes);
    this.router.initRouter();
  };
}
