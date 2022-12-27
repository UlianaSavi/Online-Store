// import { Model } from './models/model';
import { IAppState /* IProductsResponse */ } from './types';
import { START_PAGE } from './contains';
import { create } from './utils/create';
import { Header } from './components/Header/Header';
import { PageMain } from './pages/PageMain/PageMain';
import { Footer } from './components/Footer/Footer';
// import { Catalog } from './pages/PageCatalog/PageCatalog';
// import { Controller } from './controllers/controller';

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

  constructor(root: HTMLElement) {
    this.root = root;
    this.header = null;
    this.main = null;
    this.footer = null;
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

    // const model = new Model(this.BASE_STATE);
    // const controller = new Controller(model);

    // Static components
    const header = new Header(this.header);
    header.render();
    const footer = new Footer(this.footer);
    footer.render();

    // Dinamic components
    const pageMain = new PageMain(this.main);
    pageMain.mount(); // это тоже потом переместится в роутер, пока оставляю тут

    // рендером будет управлять роутер поэтому пока оставляю рендером каталога закоментированным

    // const catalog = new Catalog(this.main, model);
    // catalog.mount({
    //   mounted: () => {
    //     fetch('../assets/data/data.json')
    //       .then((data) => data.json())
    //       .then((data: IProductsResponse) => controller.setData(data.products)); // controller.setData(data) - а начале страница ( кроме хедера и футера ) будет пустая и рендерится только при обновлении, но ты будешь цеплять данные и рендерить их в компоненты страницы и тк в компонентых появятся появятся данные, то есть апдейт - страница отрендерится ( тк компоненты подписаны в странице на изменения)
    //   }
    // });
  };
}
