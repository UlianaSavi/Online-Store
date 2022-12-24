import { create } from '../../utils/create';

interface IProductsProps {
  names: string[];
  prices: number;
  stocks: number;
}

export class Products {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props?: IProductsProps) => {
    this.render(props);
  };

  render = (props?: IProductsProps) => {
    console.log(props);

    this.component?.remove();

    this.component = create({
      tagName: 'div',
      classNames: 'products',
      children: []
    });
  };
}
