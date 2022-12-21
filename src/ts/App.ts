import { Model } from './models/model';
// import { PageController } from './controllers/page.controller';
// import { Controller } from './controllers/controller';
import { IAppState } from './types';
import { START_PAGE } from './contains';
import { create } from './utils/create';
// import { Button } from './components/Button/Button';
// import { Counter } from './components/Counter/Counter';
// import { isEqual } from './utils/objects';
import { Header } from './components/Header/Header';
import { MainHTML } from './components/MainHTML/MainHTML';
import { Footer } from './components/Footer/Footer';

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
    })
  };

  init = () => {
    this.createDefaultLayer();

    const model = new Model(this.BASE_STATE);
    // const controller = new Controller(model);

    // Static components
    // const minus = new Button(this.header, controller);
    // const plus = new Button(this.header, controller);
    // const test = new Button(this.header, controller);
    const header = new Header(this.header);
    header.render();
    const mainHTML = new MainHTML(this.main);
    mainHTML.render();
    const footer = new Footer(this.footer);
    footer.render();

    // Dinamic components
    // const counter = new Counter(this.header, controller);

    // Subscribers
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
