import { Controller } from '../../controllers/controller';
import { create } from '../../utils/create';

export class Counter {
  controller: Controller;
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.controller = controller;
    this.parent = parent;
    this.component = null;
  }

  update = (props: number | string) => {
    this.render(props);
  };

  render = (props: number | string) => {
    console.log('UPDATE');

    this.component?.remove();

    this.component = create({
      tagName: 'div',
      classNames: 'counter',
      children: `${props}`,
      parent: this.parent
    });
  };
}
