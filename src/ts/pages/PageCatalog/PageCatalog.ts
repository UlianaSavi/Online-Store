import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { Filters } from '../../components/Filters/Filters';
import { isEqual } from '../../utils/objects';
import { Products } from '../../components/Products/Products';
import { IPageProps } from '../../types';

export class Catalog {
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
      classNames: 'catalog container catalog__wrapper',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    const state = this.model.getState();

    const filters = new Filters(this.section);
    const products = new Products(this.section);

    if (this.mounted) {
      const categories = [
        ...new Set(state.products.map((item) => item.category).filter((item) => !!item))
      ];
      const names = [
        ...new Set(state.products.map((item) => item.animeName).filter((item) => !!item))
      ];
      filters.update({ names, categories });

      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
      products.update({ items });
    }

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      const categories = [
        ...new Set(state.products.map((item) => item.category).filter((item) => !!item))
      ];
      const names = [
        ...new Set(state.products.map((item) => item.animeName).filter((item) => !!item))
      ];

      filters.update({ names, categories });
    });

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
      products.update({ items });
    });

    this.mounted = true;
    props?.mounted && props?.mounted();
  };
}
