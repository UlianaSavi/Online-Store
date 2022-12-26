import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { Filters } from '../../components/Filters/Filters';
import { isEqual } from '../../utils/objects';
import { Products } from '../../components/Products/Products';

export class Catalog {
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
      classNames: 'catalog container catalog__wrapper',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = ({ mounted }: { mounted?: () => void }) => {
    this.createDefaultLayer();

    const filters = new Filters(this.section);
    const products = new Products(this.section);

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

    mounted && mounted();
  };
}
