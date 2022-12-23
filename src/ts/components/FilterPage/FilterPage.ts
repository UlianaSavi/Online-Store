import { IAppState } from '../../types';
import { create } from '../../utils/create';

export class FilterPage {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props: IAppState) => {
    this.render(props);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render = (props?: IAppState) => {
    this.component?.remove();

    this.component = create({
      tagName: 'div',
      classNames: 'main__wrapper',
      children: `This is filter page`,
      parent: this.parent
    })
    return this.component;
  }
  
}