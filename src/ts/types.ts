interface IPageState {
  currentPage: string;
}

interface ICounterState {
  count: number | string;
}

export interface IAppState {
  page: IPageState;
  count: ICounterState;
}