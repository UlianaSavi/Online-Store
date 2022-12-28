import { Details } from '../../components/Details/Details';
import { Model } from '../../models/model';
import { IPageProps } from '../../types';
import { create } from '../../utils/create';
import { isEqual } from '../../utils/objects';

export class PageDetails {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;

  constructor(parent: HTMLElement | null, model: Model) {
    this.parent = parent;
    this.section = null;
    this.model = model;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'details container',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    const details = new Details(this.section);

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
      details.update({ item: items[0] });
    });

    props?.mounted && props?.mounted();
  };
}
