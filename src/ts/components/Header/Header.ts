import { create } from '../../utils/create';

export class Header {
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
      classNames: 'header__wrapper',
      children: [
        create({
          tagName: 'h1',
          classNames: 'header__logo',
          children: [
            create({
              tagName: 'img',
              classNames: 'header__logo-img',
              dataAttr: [
                ['src', './assets/img/AnimeOz-removebg-preview.png'],
                ['alt', 'logo']
              ]
            })
          ]
        }),
        create({
          tagName: 'div',
          classNames: 'search',
          children: [
            create({
              tagName: 'input',
              classNames: 'search__input',
              dataAttr: [
                ['type', 'text'],
                ['placeholder', 'Поиск']
              ]
            }),
            create({
              tagName: 'button',
              classNames: 'search__button',
              children: `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="search__svg">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
              </svg>
              `
            })
          ]
        }),
        card
      ],
      parent: this.parent
    });
  };
}
