import { Model } from './models/model';
import { Controller } from './controllers/controller';
import { IAppState, IProductsResponse } from './types';
import { create } from './utils/create';
import { parseUrlParams } from './utils/url';
import { Footer } from './components/Footer/Footer';
import { Router } from './Router/Router';
import { PageMain } from './pages/PageMain/PageMain';
import { Page404 } from './pages/Page404/Page404';
import { PageDetails } from './pages/PageDetails/PageDetails';
import { Catalog } from './pages/PageCatalog/PageCatalog';
import { PageCart } from './pages/PageCart/PageCart';
import { Popup } from './components/Popup/Popup';
import { Header } from './components/Header/Header';

export class App {
  BASE_STATE: IAppState = {
    products: [],
    currProductID: 0,
    productsToShow: [],
    namesToShow: [],
    categoryFilters: [],
    nameFilters: [],
    sort: '',
    search: '',
    view: 'viewMain',
    cartProducts: []
  };

  main: HTMLElement | null;
  footer: HTMLElement | null;
  root: HTMLElement;
  router: Router | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.main = null;
    this.footer = null;
    this.router = null;
  }

  createDefaultLayer = () => {
    // this.header = create({
    //   tagName: 'header',
    //   dataAttr: [['id', 'header']],
    //   parent: this.root
    // });
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
    this.router = new Router(this.main);

    // Static components
    const footer = new Footer(this.footer);
    footer.mount();

    // Dinamic components

    const header = new Header(this.main, this.router.route, controller);
    header.update();
    const pageMain = new PageMain(model, this.main, this.router.route, controller);
    const pageCart = new PageCart(this.main, model, controller, header);
    const pageCatalog = new Catalog(
      this.main,
      model,
      controller,
      this.router.route,
      pageCart,
      header
    );
    const page404 = new Page404(this.main, this.router.route);
    const pageDetails = new PageDetails(this.main, model, controller, this.router.route);
    const popup = new Popup(this.main, controller);
    popup.mount();
    controller.setPopup(popup);

    fetch('../assets/data/data.json')
      .then((data) => data.json())
      .then((data: IProductsResponse) => controller.setData(data.products))
      .then(() => {
        const params = parseUrlParams();

        if (params?.categoryFilters?.length) {
          params.categoryFilters.forEach((category) => {
            controller.addFilterByCategory(category);
          });
        }
        if (params?.nameFilters?.length) {
          params.nameFilters.forEach((name) => {
            controller.addFilterByName(name);
          });
        }

        if (params?.sort) {
          controller.addSorting(params.sort.toString());
        }

        if (params?.search) {
          controller.addSearching(params?.search.toString());
        }

        if (params?.view) {
          controller.changeView(params?.view.toString());
        }
      });

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
        mount: pageCatalog.mount,
        unmount: pageCatalog.unmount,
        mountedProps: {
          mounted: () => {
            model.fire();
          }
        }
      },
      '/details/:id': {
        mount: pageDetails.mount,
        unmount: pageDetails.unmount,
        mountedProps: {
          mounted: () => {
            model.fire();
          }
        }
      },
      '/cart': {
        mount: pageCart.mount,
        unmount: pageCart.unmount,
        mountedProps: {
          mounted: () => {
            model.fire();
          }
        }
      }
    };

    // Router
    this.router.initRouter(routes);

    model.fire();
  };
}
