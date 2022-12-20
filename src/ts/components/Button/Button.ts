import { Controller } from '../../controllers/controller';
import { IAppState } from '../../types';
import { create } from '../../utils/create';

export class Button {
  controller: Controller;
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.controller = controller;
    this.parent = parent;
    this.component = null;
  }

  update = (props: IAppState, title: string, onClick: () => void) => {
    this.render(props, title, onClick);
  };

  render = (props?: IAppState, testProp?: string, onClick?: () => void) => {
    this.component?.remove();

    this.component = create({
      tagName: 'button',
      classNames: 'btn',
      children: testProp,
      parent: this.parent
    });

    if (onClick) {
      this.component.addEventListener('click', onClick);
    }
  };
}
