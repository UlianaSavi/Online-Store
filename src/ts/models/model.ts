import { IAppState } from '../types';

export class Model {
  subscribers: Array<(state: IAppState, prevState?: IAppState | null) => void>;
  prevState: IAppState | null;
  state: IAppState;

  constructor(baseState: IAppState) {
    this.prevState = null;
    this.state = baseState;
    this.subscribers = [];
  }

  setState = (state: IAppState): void => {
    this.prevState = this.state;
    this.state = state;
    this.fire();
  };

  getState = (): IAppState => {
    return structuredClone(this.state);
  };

  subscribe = (callback: (state: IAppState, prevState?: IAppState | null) => void) => {
    this.subscribers.push(callback);
  };

  fire = () => {
    this.subscribers.forEach((callback) => {
      callback(this.state, this.prevState);
    });
  };

  clear = () => {
    this.subscribers = [];
  };
}
