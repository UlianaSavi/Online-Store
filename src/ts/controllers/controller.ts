import { Model } from '../models/model';
import { IProduct } from '../types';
import { Popup } from '../components/Popup/Popup';
import { create } from '../utils/create';
export class Controller {
  model: Model;
  popup: Popup | null;

  constructor(model: Model) {
    this.model = model;
    this.popup = null;
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

  prepareProductsToShow = () => {
    const state = this.model.getState();
    const categoryFilters = [...state.categoryFilters];
    const nameFilters = [...state.nameFilters];
    let products = [...state.products];

    if (categoryFilters.length) {
      products = products.filter(({ category }) => categoryFilters.includes(category));
    }

    if (nameFilters.length) {
      products = products.filter(({ animeName }) => nameFilters.includes(animeName));
    }

    this.model.setState({
      ...state,
      productsToShow: products
    });
  };

  // POPUP
  setPopup = (popup: Popup) => {
    this.popup = popup;
  }

  openPopup = () => {
    this.popup?.component?.classList.add('active');
    this.popup?.popupContent?.classList.add('active');
  }

  closePopup = () => {
    this.popup?.component?.classList.remove('active');
    this.popup?.popupContent?.classList.remove('active');
  }

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
        window.location.pathname = '/'

        // TODO: Clean Cart 
        this.cleanCart();
      }, 1100);
    }, 700)
  }

  cleanCart = () => {
    // TODO: Clean Cart 
  }

  // pagination
  isDisabled = (countOfPages: number, pageCounter: number, btnLeft: HTMLButtonElement, btnRight: HTMLButtonElement) => {
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
  }
}
