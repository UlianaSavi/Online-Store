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
}
