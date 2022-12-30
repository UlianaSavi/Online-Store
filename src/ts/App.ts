import { Model } from './models/model';
import { Controller } from './controllers/controller';
import { IAppState, IProductsResponse } from './types';
import { START_PAGE } from './contains';
import { create } from './utils/create';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Router } from './Router/Router';
import { PageMain } from './pages/PageMain/PageMain';
import { PageFilter } from './pages/PageFilter/PageFilter';
import { Page404 } from './pages/Page404/Page404';
import { PageDetails } from './pages/PageDetails/PageDetails';
import { Popup } from './components/Popup/Popup';

export class App {
  BASE_STATE: IAppState = {
    page: {
      currentPage: START_PAGE
    },
    products: []
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
    const controller = new Controller(model);

    // Static components
    const header = new Header(this.header);
    header.mount();
    const footer = new Footer(this.footer);
    footer.mount();

    // Dinamic components
    const pageMain = new PageMain(this.main);
    const pageFilter = new PageFilter(this.main);
    const page404 = new Page404(this.main);
    const pageDetails = new PageDetails(this.main, model);

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
      },
      '/details': {
        mount: pageDetails.mount,
        unmount: pageDetails.unmount,
        mountedProps: {
          mounted: () => {
            fetch('../assets/data/data.json')
              .then((data) => data.json())
              .then((data: IProductsResponse) => controller.setData(data.products));
          }
        }
      }
    };

    model.fire();

    // Router
    this.router = new Router(this.main, routes);
    this.router.initRouter();
  };
}
