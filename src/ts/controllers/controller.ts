import { Model } from '../models/model';
import { IProduct } from '../types';
import { setUrlParams } from '../utils/url';
import { Popup } from '../components/Popup/Popup';
import { create } from '../utils/create';
export class Controller {
  model: Model;
  popup: Popup | null;

  constructor(model: Model) {
    this.model = model;
    this.popup = null;
  }

  // data

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

    this.model.setState({
      ...state,
      categoryFilters
    });
    this.prepareProductsToShow();
  };

  addFilterByCategory = (category: string) => {
    const state = this.model.getState();
    const categoryFilters = [...state.categoryFilters, category];

    this.model.setState({
      ...state,
      categoryFilters
    });
    this.prepareProductsToShow();
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
    const nameFilters = state.nameFilters.filter((itemName) => itemName !== name);

    this.model.setState({
      ...state,
      nameFilters
    });
    this.prepareProductsToShow();
  };

  addFilterByName = (name: string) => {
    const state = this.model.getState();
    const nameFilters = [...state.nameFilters, name];

    this.model.setState({
      ...state,
      nameFilters
    });
    this.prepareProductsToShow();
  };

  // ProductsToShow

  prepareProductsToShow = () => {
    const state = this.model.getState();
    const categoryFilters = [...state.categoryFilters];
    const nameFilters = [...state.nameFilters];
    const sort = state.sort;
    let products = [...state.products];

    const params: { [s: string]: string[] } = {};

    if (categoryFilters.length) {
      params.categoryFilters = categoryFilters;
      products = products.filter(({ category }) => categoryFilters.includes(category));
    }

    if (nameFilters.length) {
      params.nameFilters = nameFilters;
      products = products.filter(({ animeName }) => nameFilters.includes(animeName));
    }

    if (sort.length) {
      params.sort = [sort];

      switch (sort) {
        case 'chaepAtFirst':
          products = products.sort((a, b) => (a.price > b.price ? 1 : -1));
          break;
        case 'expensiveFirst':
          products = products.sort((a, b) => (b.price > a.price ? 1 : -1));
          break;
        case 'MoreInStock':
          products = products.sort((a, b) => (b.stock > a.stock ? 1 : -1));
          break;

        default:
          break;
      }
    }

    setUrlParams(params);

    this.model.setState({
      ...state,
      productsToShow: products
    });
  };

  // POPUP
  setPopup = (popup: Popup) => {
    this.popup = popup;
  };

  openPopup = () => {
    this.popup?.component?.classList.add('active');
    this.popup?.popupContent?.classList.add('active');
  };

  closePopup = () => {
    this.popup?.component?.classList.remove('active');
    this.popup?.popupContent?.classList.remove('active');
  };

  confirmPopup = (form: HTMLElement, cross: HTMLElement) => {
    const confirmText = create({
      tagName: 'h2',
      classNames: 'confirm-text',
      children: `The order has been placed`
    });

    setTimeout(() => {
      form.innerHTML = ``;
      cross.innerHTML = ``;
      form.parentNode?.appendChild(confirmText);
      setTimeout(() => {
        window.location.pathname = '/';

        // TODO: Clean Cart
        this.cleanCart();
      }, 1100);
    }, 700);
  };

  cleanCart = () => {
    // TODO: Clean Cart
  };

  // Sorting

  addSorting = (str: string) => {
    const state = this.model.getState();
    const sort = str;

    this.model.setState({
      ...state,
      sort
    });
    this.prepareProductsToShow();
  };
}
