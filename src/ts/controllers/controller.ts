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
      products: data
    });
  };

  clearData = () => {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      products: []
    });
  };

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
      }, 1100);
    }, 700)
  }
}
