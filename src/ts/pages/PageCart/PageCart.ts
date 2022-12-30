import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { isEqual } from '../../utils/objects';
import { IPageProps } from '../../types';
import { CartList } from '../../components/CartList/CartList';

export class PageCart {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;
  mounted: boolean;

  constructor(parent: HTMLElement | null, model: Model) {
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.mounted = false;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'cart container',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    const cartList = new CartList(this.section);

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      cartList.update();
    });

    props?.mounted && props?.mounted();
  };
}
