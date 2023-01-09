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

  unsubscribe = (index: number) => {
    this.subscribers.splice(index, 1);
  }

  subscribe = (callback: (state: IAppState, prevState?: IAppState | null) => void): number => {
    this.subscribers.push(callback);
    return this.subscribers.length -  1;
  };

  fire = () => {
    this.subscribers.forEach((callback) => {
      callback(this.state, this.prevState);
    });
  };
}
