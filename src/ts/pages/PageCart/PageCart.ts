import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { isEqual } from '../../utils/objects';
import { IPageProps} from '../../types';
import { CartList } from '../../components/CartList/CartList';
import { Total } from '../../components/CartTotal/CartTotal';
import { Controller } from '../../controllers/controller';
import { Header } from '../../components/Header/Header';

export class PageCart {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;
  mounted: boolean;
  controller: Controller;
  header: Header;
  subsIndex: number | null;

  constructor(parent: HTMLElement | null, model: Model, controller: Controller, header: Header) {
    console.log("creating new cart")
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.mounted = false;
    this.controller = controller;
    this.header = header;
    this.subsIndex = null;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'cart container cart__wrapper',
      parent: this.parent
    });
  };

  unmount = () => {
    if (this.subsIndex !== null) {
      this.model.unsubscribe(this.subsIndex);
    }
    this.section?.remove();
    console.log("unmount");
  };

  mount = (props?: IPageProps) => {
    // this.unmount();
    console.log("mount");
    this.createDefaultLayer();

    if (this.controller.getCurrentCartProducts().length !== 0) {
      this.subsIndex = this.model.subscribe((state, prevState) => {
        // В местах этих проверок будет не state и prevState, а дополнительное значение, которое будет создано при работе с функционалом корзины
        // Поэтому на данном этапе оставляю эти проверки законментированными, но их наличие **обязательно** при дальнейшей работе

        if (isEqual(state.cartProducts, prevState?.cartProducts)) {
          console.log(JSON.stringify(state.cartProducts));
          console.log("equals")
          return;
        }
        console.log(JSON.stringify(state.cartProducts));
        console.log(JSON.stringify(prevState?.cartProducts));
        this.section?.remove();
        this.header.renderCartWrapper();
        this.createDefaultLayer();
        const total = new Total(this.section, this.controller);
        const cartList = new CartList(this.section, this.controller, total, this.header, this);
        cartList.update();
        total.update();
      });
    } else {
      this.section?.appendChild(
        create({
          tagName: 'h1',
          classNames: 'no-items',
          children: `Your shopping cart is empty :(`
        })
      );
    }

    props?.mounted && props?.mounted();
  };
}
