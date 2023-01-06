import { Model } from '../../models/model';
import { create } from '../../utils/create';
// import { isEqual } from '../../utils/objects';
import { IPageProps } from '../../types';
import { CartList } from '../../components/CartList/CartList';
import { Total } from '../../components/CartTotal/CartTotal';
import { Controller } from '../../controllers/controller';

export class PageCart {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;
  mounted: boolean;
  controller: Controller;

  constructor(parent: HTMLElement | null, model: Model, controller: Controller) {
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.mounted = false;
    this.controller = controller;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'cart container cart__wrapper',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    const cartList = new CartList(this.section);
    const total = new Total(this.section, this.controller);

    this.model.subscribe((state /* prevState*/) => {
      // В местах этих проверок будет не state и prevState, а дополнительное значение, которое будет создано при работе с функционалом корзины
      // Поэтому на данном этапе оставляю эти проверки законментированными, но их наличие **обязательно** при дальнейшей работе

      // if (isEqual(state.products, prevState?.products)) {
      //   return;
      // }
      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
      cartList.update({ items });
    });
    this.model.subscribe((/* state, prevState */) => {
      // if (isEqual(state.products, prevState?.products)) {
      //   return;
      // }
      total.update();
    });

    props?.mounted && props?.mounted();
  };
}
