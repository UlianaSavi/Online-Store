import { create } from '../../utils/create';

export class Page404 {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  unmount = () => {
    this.component?.remove();
  };

  mount = () => {
    this.component = create({
      tagName: 'div',
      classNames: 'main__wrapper',
      children: [
        // create({
        //   tagName: 'h2',
        //   classNames: 'main__header',
        //   children: ['404 page']
        // })
        `404 page`
      ],
      parent: this.parent
    })
    return this.component;
  }
}