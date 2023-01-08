import { Controller } from '../../controllers/controller';
import { create } from '../../utils/create';

export class Header {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  go: (event: Event) => void;
  controller: Controller;
  goodsCounter: number;

  constructor(parent: HTMLElement | null, go: (event: Event) => void, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.go = go;
    this.controller = controller;
    this.goodsCounter = 0;
  }

  update = () => {
    this.render();
  };

  render = () => {
    const cart = create({
      tagName: 'a',
      classNames: 'cart-shopping__button',
      dataAttr: [['href', '/cart']],
      children: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        class="cart-shopping__svg">
        <path
          d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
      </svg>`
    });

    cart.addEventListener('click', this.go);

    const linkToMain = create({
      tagName: 'a',
      dataAttr: [['href', '/']],
      children: [
        create({
          tagName: 'h1',
          classNames: 'header__logo',
          children: [
            create({
              tagName: 'img',
              classNames: 'header__logo-img',
              dataAttr: [
                ['src', '/assets/img/AnimeOz-removebg-preview.png'],
                ['alt', 'logo']
              ]
            })
          ]
        })
      ]
    });

    linkToMain.addEventListener('click', this.go);

    const searchInput = create({
      tagName: 'input',
      classNames: 'search__input',
      dataAttr: [
        ['type', 'text'],
        ['placeholder', 'Search'],
        ['value', `${localStorage.getItem('searchInput') || ''}`]
      ]
    }) as HTMLInputElement;

    searchInput.addEventListener('keyup', () => {
      localStorage.setItem('searchInput', searchInput.value);
      this.controller.addSearching(searchInput.value);
      // const nodelist = this.parent?.children;
      // const divyArray = Array.prototype.slice.call(nodelist);
      // console.log(...divyArray);

      // if (divyArray.map((item) => item.classList.contains('catalog'))) {
      //   localStorage.setItem('searchInput', searchInput.value);
      //   this.controller.addSearching(searchInput.value);
      // } else {
      //   searchInput.value = '';
      // }

      // if (this.parent?.children.item(0 - 4)?.classList.contains('catalog')) {
      //   localStorage.setItem('searchInput', searchInput.value);
      //   this.controller.addSearching(searchInput.value);
      // } else {
      //   searchInput.value = '';
      // }
    });

    const goodsCounterBlock = create({
      tagName: 'div',
      classNames: 'cart-shopping__goods-counter-wrapper',
      children: [`${this.goodsCounter}`]
    });

    this.component = create({
      tagName: 'div',
      classNames: 'header__wrapper',
      children: [
        linkToMain,
        create({
          tagName: 'div',
          classNames: 'search',
          children: [
            searchInput,
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
        create({
          tagName: 'div',
          classNames: 'cart-shopping__wrapper',
          children: [cart, goodsCounterBlock]
        })
      ],
      parent: this.parent
    });
  };
}
