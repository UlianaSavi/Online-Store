import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { isEqual } from '../../utils/objects';
import { IPageProps } from '../../types';
import { CartList } from '../../components/CartList/CartList';
import { Total } from '../../components/CartTotal/CartTotal';
import { Controller } from '../../controllers/controller';

// for case when no items -- should be uncomment when add delete or add items in cart

export class PageCart {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;
  mounted: boolean;
  controller: Controller;
  // for case when no items
  // items: IProduct[];

  constructor(parent: HTMLElement | null, model: Model, controller: Controller) {
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.mounted = false;
    this.controller = controller;
    // for case when no items
    // this.items = [];
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

    const total = new Total(this.section, this.controller);
    const cartList = new CartList(this.section, this.controller, total);
    
    // for case when no items
    // if (this.items.length !== 0) {
    
    this.model.subscribe((state, prevState) => {
        if (isEqual(state.products, prevState?.products)) {
          return;
        }
        const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
        cartList.update({ items });
      });
      this.model.subscribe((state, prevState) => {
        if (isEqual(state.products, prevState?.products)) {
          return;
        }
        total.update();
      });
      
    // for case when no items
    // } else {
      // this.section?.appendChild(create({
        // tagName: 'h1',
        // classNames: 'no-items',
        // children: `Your shopping cart is empty :(`
      // }))
    // }

    props?.mounted && props?.mounted();
  };
}
