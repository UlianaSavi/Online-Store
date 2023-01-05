import { Model } from '../../models/model';
import { create } from '../../utils/create';
import { Filters } from '../../components/Filters/Filters';
import { isEqual } from '../../utils/objects';
import { Products } from '../../components/Products/Products';
import { IPageProps } from '../../types';
import { Controller } from '../../controllers/controller';
export class Catalog {
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

    const filters = new Filters(
      this.section,
      this.controller.setFilterByCategory,
      this.controller.setFilterByName
    );
    const products = new Products(this.section);

    if (this.mounted) {
      const categoriesSet = [
        ...new Set(state.products.map((item) => item.category).filter((item) => !!item))
      ];
      const namesSet = [
        ...new Set(state.products.map((item) => item.animeName).filter((item) => !!item))
      ];
      const categories = categoriesSet.map((name) => {
        const count = state.productsToShow.filter((item) => item.category === name).length;
        const baseCount = state.products.filter((item) => item.category === name).length;
        return { name, count, baseCount };
      });
      const names = namesSet.map((name) => {
        const count = state.productsToShow.filter((item) => item.animeName === name).length;
        const baseCount = state.products.filter((item) => item.animeName === name).length;
        return { name, count, baseCount };
      });
      filters.update({ names, categories });

      const items = [...new Set(state.productsToShow.map((item) => item).filter((item) => !!item))];
      products.update({ items });
    }

    this.model.subscribe((state, prevState) => {
      // if (
      //   isEqual(state.products, prevState?.products) &&
      //   isEqual(state.productsToShow, prevState?.productsToShow)
      // ) {
      //   return;
      // }
      const categoriesSet = [
        ...new Set(state.products.map((item) => item.category).filter((item) => !!item))
      ];
      const namesSet = [
        ...new Set(state.products.map((item) => item.animeName).filter((item) => !!item))
      ];

      const stateNumbers = state.productsToShow.map((item) => item.price);
      const stateStocks = state.productsToShow.map((item) => item.stock);

      const categories = categoriesSet.map((name) => {
        const count = state.productsToShow.filter((item) => item.category === name).length;
        const baseCount = state.products.filter((item) => item.category === name).length;
        return { name, count, baseCount };
      });
      const names = namesSet.map((name) => {
        const count = state.productsToShow.filter((item) => item.animeName === name).length;
        const baseCount = state.products.filter((item) => item.animeName === name).length;
        return { name, count, baseCount };
      });

      const maxVal = Math.max(...stateNumbers);
      const minVal = Math.min(...stateNumbers);
      const maxStocks = Math.max(...stateStocks);
      const minStocks = Math.min(...stateStocks);

      const props = {
        names,
        categories,
        maxVal,
        minVal,
        maxStocks,
        minStocks,
        activeCategoriesFilters: state.categoryFilters,
        activeNameFiltrs: state.nameFilters
      };

      filters.update(props);
    });

    this.model.subscribe((state, prevState) => {
      // if (
      //   isEqual(state.productsToShow, prevState?.productsToShow) &&
      //   isEqual(state.categoryFilters, prevState?.categoryFilters)
      // ) {
      //   return;
      // }

      const items = [...new Set(state.productsToShow.map((item) => item).filter((item) => !!item))];
      products.update({ items });
    });

    this.mounted = true;
    props?.mounted && props?.mounted();
  };
}
