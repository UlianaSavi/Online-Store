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
    const productsToShow =
      categoryFilters.length || state.nameFilters.length
        ? state.productsToShow.filter(({ category }) => categoryFilters.includes(category))
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

    const productsToShow =
      categoryFilters.length || state.nameFilters.length
        ? state.products.filter(({ category }) => categoryFilters.includes(category))
        : state.products;

    this.model.setState({
      ...state,
      categoryFilters,
      productsToShow
    });

    console.log(categoryFilters, productsToShow);
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
    const productsToShow =
      nameFilters.length || state.categoryFilters.length
        ? state.productsToShow.filter(({ animeName }) => nameFilters.includes(animeName))
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
    const productsToShow = state.categoryFilters.length
      ? state.productsToShow.filter(({ animeName }) => nameFilters.includes(animeName)) // если выбрана категория, то фильтруй productsToShow
      : state.products || (nameFilters.length && state.categoryFilters.length === 0) // если выбран фильтр по имени и не выбрано категории, то фильтруй state.products
      ? state.products.filter(({ animeName }) => nameFilters.includes(animeName))
      : state.products;

    // нужно научиться фильтровать если уже выбран одни или нескошлько фидьтров из другого блока

    // const test = state.products.filter(({ category }) => nameFilters.includes(category));
    // console.log('test', test);

    this.model.setState({
      ...state,
      nameFilters,
      productsToShow
    });

    // console.log(nameFilters, productsToShow);
  };
}
