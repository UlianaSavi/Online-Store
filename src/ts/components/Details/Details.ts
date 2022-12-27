import { create } from '../../utils/create';
import { IProduct } from '../../types';

interface IDetailsProps {
  items: IProduct[];
}
export class Details {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props?: IDetailsProps) => {
    this.render(props);
  };

  render = (props?: IDetailsProps) => {
    console.log(props);
    this.component?.remove();

    this.component = create({
      tagName: 'div',
      classNames: 'details__wrapper',
      children: [
        create({
          tagName: 'div',
          classNames: 'link__nav-wrapper',
          children: [
            create({
              tagName: 'div',
              classNames: 'link__nav-item',
              children: 'STORE'
            })
          ]
        })
      ],
      parent: this.parent
    });
  };
}
