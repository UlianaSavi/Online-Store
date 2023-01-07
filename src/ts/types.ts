export interface IAppState {
  products: IProduct[];
  productsToShow: IProduct[];
  namesToShow: IProduct[];
  categoryFilters: string[];
  nameFilters: string[];
  sort: string;
  search: string;
  view: string;
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

export interface IPageProps {
  mounted?: () => void;
}
