import { Model } from './models/model';
// import { Controller } from './controllers/controller';
import { IAppState } from './types';
import { START_PAGE } from './contains';
import { create } from './utils/create';
import { Header } from './components/Header/Header';
// import { MainHTML } from './components/MainHTML/MainHTML';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/CatalogPage/CatalogPage';

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

    const model = new Model(this.BASE_STATE);

    // Static components
    const header = new Header(this.header);
    header.render();
    const footer = new Footer(this.footer);
    footer.render();

    // Dinamic components
    const mainHTML = new Catalog(this.main);
    mainHTML.render({
      mounted: () => {
        // логика при отрисовки страницы
        // fetch data
        fetch('../assets/data/data.json')
          .then((data) => data.json())
          .then((data) => console.log(data)); // controller.setData(data) - а начале страница ( кроме хедера и футера ) будет пустая и рендерится только при обновлении, но ты будешь цеплять данные и рендерить их в компоненты страницы и тк в компонентых появятся появятся данные, то есть апдейт - страница отрендерится ( тк компоненты подписаны в странице на изменения)
      }
    });

    // Subscribers - эта хуйня будет в основных страницах, там ты будешь подписывать компоненты на изменения
    // model.subscribe((state, prevState) => {
    //   if (isEqual(state.count, prevState?.count)) {
    //     return;
    //   }
    //   counter.update(state.count.count);
    // });
    // model.subscribe((state) => {
    //   minus.update(state, 'Minus', () => {
    //     controller.minus();
    //   });
    // });
    // model.subscribe((state) => {
    //   plus.update(state, 'Plus', () => {
    //     controller.plus();
    //   });
    // });
    // model.subscribe((state) => {
    //   test.update(state, 'Free', () => {
    //     controller.freeUpdate();
    //   });
    // });

    model.fire();
  };
}
