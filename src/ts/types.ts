interface IPageState {
  currentPage: string;
}

interface ICounterState {
  count: number | string;
}

export interface IAppState {
  page: IPageState;
  products: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  popularity: number;
  stock: number;
  animeName: string;
  category: string;
  images: string[];
}
export interface IProductsResponse {
  products: IProduct[];
}
