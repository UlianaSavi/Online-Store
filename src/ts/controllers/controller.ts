import { Model } from '../models/model';
import { IProduct } from '../types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  plus = () => {
    const state = this.model.getState();

    if (state.count.count >= 10) {
      this.model.setState({
        ...state,
        count: {
          ...state.count,
          count: 'It`s max value!'
        }
      });
      return;
    }

    this.model.setState({
      ...state,
      count: {
        ...state.count,
        count: typeof state.count.count === 'number' ? +state.count.count + 1 : 0
      }
    });
  };

  minus = () => {
    const state = this.model.getState();

    if (state.count.count <= 0) {
      return;
    }

    this.model.setState({
      ...state,
      count: {
        ...state.count,
        count: typeof state.count.count === 'number' ? +state.count.count - 1 : 0
      }
    });
  };

  setData = (data: IProduct[]) => {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      products: data
    });
  };
}
