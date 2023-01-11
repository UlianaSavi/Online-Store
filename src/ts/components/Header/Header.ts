import { Controller } from '../../controllers/controller';
import { create } from '../../utils/create';
import { CartInHeader } from './CartInHeader';
import { SearchInHeader } from './SearchInHeader';

export class Header {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  go: (event: Event) => void;
  controller: Controller;
  goodsCounter: number;
  cartInHeader: CartInHeader;
  cardWrapper: HTMLElement | null;
  searchInHeader: SearchInHeader;
  searchWrapper: HTMLElement | null;

  constructor(parent: HTMLElement | null, go: (event: Event) => void, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.go = go;
    this.controller = controller;
    this.goodsCounter = 0;
    this.cartInHeader = new CartInHeader(controller, go);
    this.cardWrapper = null;
    this.searchInHeader = new SearchInHeader(controller);
    this.searchWrapper = null;
  }

  update = () => {
    this.render();
  };

  render = () => {
    this.component?.remove();
    this.cartInHeader.render();
    this.searchInHeader.render();

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

    this.cardWrapper = create({
      tagName: 'div',
      classNames: 'cart-shopping__wrapper',
      children: [this.cartInHeader.cart, this.cartInHeader.goodsCounterBlock]
    });

    this.searchWrapper = create({
      tagName: 'div',
      classNames: 'search',
      children: [this.searchInHeader.searchInput, this.searchInHeader.searchButton]
    });

    this.component = create({
      tagName: 'div',
      classNames: 'header__wrapper',
      children: [linkToMain, this.searchWrapper, this.cardWrapper],
      parent: this.parent
    });
  };

  renderCartWrapper = () => {
    this.cartInHeader.render();
    if (this.cardWrapper !== null) {
      this.component?.removeChild(this.cardWrapper);
      this.cardWrapper = create({
        tagName: 'div',
        classNames: 'cart-shopping__wrapper',
        children: [
          this.cartInHeader.cart,
          this.cartInHeader.goodsCounterBlock,
          this.cartInHeader.goodsTotalSumBlock
        ]
      });
      this.component?.appendChild(this.cardWrapper);
    }
  };

  renderSearchWrapper = () => {
    this.searchInHeader.render();
    if (this.searchWrapper !== null) {
      this.component?.removeChild(this.searchWrapper);
      this.searchWrapper = create({
        tagName: 'div',
        classNames: 'search',
        children: [this.searchInHeader.searchInput, this.searchInHeader.searchButton]
      });
      this.component?.appendChild(this.searchWrapper);
    }
  };
}
