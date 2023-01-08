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

  // data (main)

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
    const params: { [s: string]: string[] } = {};
    setUrlParams(params);
    localStorage.clear();
    this.model.setState({
      ...state,
      productsToShow: state.products,
      categoryFilters: [],
      nameFilters: [],
      sort: '',
      search: ''
    });
  };
  // FILTERS (by Category) (filter page)

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

  // FILTERS (by Name) (filter page)

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

  // ProductsToShow (filter page)

  prepareProductsToShow = () => {
    const state = this.model.getState();
    const url = window.location.pathname;
    const categoryFilters = [...state.categoryFilters];
    const nameFilters = [...state.nameFilters];
    const sort = state.sort;
    const search = state.search;
    const view = state.view;
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

    if (search.length) {
      params.search = [search];
      products = products.filter(
        ({ name, description, price, animeName, category, popularity, stock }) => {
          const nameStr = name.toLocaleLowerCase();
          const descriptionStr = description.toLocaleLowerCase();
          const animeNameStr = animeName.toLocaleLowerCase();
          const categoryStr = category.toLocaleLowerCase();

          const stockStr = stock.toString();
          const priceStr = price.toString();
          const popularityStr = popularity.toString();

          const searchStr = search.toLocaleLowerCase();
          return (
            nameStr.match(searchStr) ||
            stockStr.match(searchStr) ||
            descriptionStr.match(searchStr) ||
            animeNameStr.match(searchStr) ||
            categoryStr.match(searchStr) ||
            priceStr.match(searchStr) ||
            popularityStr.match(searchStr)
          );
        }
      );
    }

    if (view.length) {
      params.view = [view];
    }

    if (url === '/filter') {
      setUrlParams(params);
    }

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

  // Sorting (filter page)

  addSorting = (str: string) => {
    const state = this.model.getState();
    const sort = str;

    this.model.setState({
      ...state,
      sort
    });
    this.prepareProductsToShow();
  };

  // search (filter page)

  addSearching = (str: string) => {
    const state = this.model.getState();
    const search = str;

    this.model.setState({
      ...state,
      search
    });
    this.prepareProductsToShow();
  };

  // change view  (filter page)

  changeView = (viewStr: string) => {
    const state = this.model.getState();
    const view = viewStr;

    this.model.setState({
      ...state,
      view
    });
    this.prepareProductsToShow();
  };

  // pagination
  isDisabled = (
    countOfPages: number,
    pageCounter: number,
    btnLeft: HTMLButtonElement,
    btnRight: HTMLButtonElement
  ) => {
    if (pageCounter > 1) {
      btnLeft.disabled = false;
    } else {
      btnLeft.disabled = true;
    }

    if (countOfPages === 1 || countOfPages === pageCounter) {
      btnRight.disabled = true;
    } else {
      btnRight.disabled = false;
    }
  };

  cartQuery = (page: number, pageSize: number) => {
    const params: { [s: string]: string[] } = {};
    params.page = [`${page}`];
    params.pageSize = [`${pageSize}`];
    setUrlParams(params);
  };

  // promo
  removePromo = (promoWrapper: HTMLElement | null, promo: HTMLDivElement | null) => {
    promoWrapper?.classList.remove('input-promo-wrapper_active');
    promo?.classList.remove('add-promo_active');
  };
}
