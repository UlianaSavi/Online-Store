export interface IAppState {
  products: IProduct[];
  currProductID: number;
  productsToShow: IProduct[];
  namesToShow: IProduct[];
  categoryFilters: string[];
  nameFilters: string[];
  sort: string;
  search: string;
  view: string;
  cartProducts: ICartProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  popularity: number;
  stock: number;
  animeName: string;
  filtered: boolean;
  category: string;
  images: string[];
}

export interface IProductsResponse {
  products: IProduct[];
}

export interface ICartProduct {
  product: IProduct;
  amount: number;
}

export interface IPageProps {
  mounted?: () => void;
}
