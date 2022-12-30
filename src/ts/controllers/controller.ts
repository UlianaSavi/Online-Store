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
      productsToShow: data,
      namesToShow: data
    });
  };

  clearData = () => {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      products: [],
      categoryFilters: [],
      nameFilters: []
    });
  };

  // FILTERS (by Category)

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

  // FILTERS (by Name)

  setFilterByName = (name: string, enabled = false) => {
    if (enabled) {
      this.addFilterByName(name);
      return;
    }
    this.removeFilterByName(name);
  };

  removeFilterByName = (name: string) => {
    const state = this.model.getState();
    const nameFilters = state.nameFilters.filter((cat) => cat !== name);
    const productsToShow = nameFilters.length
      ? state.products.filter(({ name }) => nameFilters.includes(name))
      : state.products;

    this.model.setState({
      ...state,
      nameFilters,
      productsToShow
    });
  };

  addFilterByName = (name: string) => {
    const state = this.model.getState();
    const nameFilters = [...state.nameFilters, name];
    const productsToShow = nameFilters.length
      ? state.products.filter(({ animeName }) => nameFilters.includes(animeName))
      : state.products;

    this.model.setState({
      ...state,
      nameFilters,
      productsToShow
    });
  };
}
