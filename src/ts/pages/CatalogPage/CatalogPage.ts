import { Model } from '../../models/model';
import { IAppState } from '../../types';
import { create } from '../../utils/create';
import { Filters } from '../../components/Filters/Filters';
import { isEqual } from '../../utils/objects';

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
      classNames: 'catalog container',
      parent: this.parent
    });
  };

  render = ({ props, mounted }: { props?: IAppState; mounted?: () => void }) => {
    console.log('props', props);
    this.createDefaultLayer();

    const filters = new Filters(this.section);

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

    this.section?.remove();
    mounted && mounted();
  };
}
