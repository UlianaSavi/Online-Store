import { Model } from '../models/model';
import { IProduct } from '../types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  setData = (data: IProduct[]) => {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      products: data,
      productsToShow: data
    });
  };

  clearData = () => {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      products: [],
      categoryFilters: []
    });
  };

  setFilterByCategory = (category: string, enabled = false) => {
    if (enabled) {
      this.addFilterByCategory(category);
      return;
    }
    this.removeFilterByCategory(category);
  };

  removeFilterByCategory = (category: string) => {
    const state = this.model.getState();
    const categoryFilters = state.categoryFilters.filter((cat) => cat !== category);
    const productsToShow = categoryFilters.length
      ? state.products.filter(({ category }) => categoryFilters.includes(category))
      : state.products;

    this.model.setState({
      ...state,
      categoryFilters,
      productsToShow
    });
  };

  addFilterByCategory = (category: string) => {
    const state = this.model.getState();
    const categoryFilters = [...state.categoryFilters, category];
    const productsToShow = categoryFilters.length
      ? state.products.filter(({ category }) => categoryFilters.includes(category))
      : state.products;

    this.model.setState({
      ...state,
      categoryFilters,
      productsToShow
    });
  };
}
