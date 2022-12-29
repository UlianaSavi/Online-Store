import { Model } from '../../models/model';
import { create } from '../../utils/create';
// import { Filters } from '../../components/Filters/Filters';
// import { isEqual } from '../../utils/objects';
// import { Products } from '../../components/Products/Products';
import { IPageProps } from '../../types';

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
      classNames: 'cart container cart__wrapper',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    props?.mounted && props?.mounted();
  };
}
