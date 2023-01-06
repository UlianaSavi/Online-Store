import { create } from '../../utils/create';
import { Controller } from '../../controllers/controller';

export class Total {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  controller: Controller;
  countItems: number;
  totalSum: number;

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.controller = controller;
    this.countItems = 10;
    this.totalSum = 1000;
  }

  update = () => {
    this.render();
  };

  render = () => {
    this.component?.remove();

    const promoArr = ['SHIT', 'SHIT2'];

    const inputPromo = create ({
      tagName: 'input',
      classNames: 'total__info__promo-code promo-input input',
      dataAttr: [['type', 'search'], ['name', 'search-promo'], ['placeholder', 'Enter promo code']]
    }) as HTMLInputElement;

    const buyBtn = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'BUY NOW'
    });

    buyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.controller.openPopup();
    });

    this.component = create({
      tagName: 'div',
      classNames: 'total',
      children: [
        create({
          tagName: 'h3',
          classNames: 'total__title h3',
          children: 'Summary'
        }),
        create({
          tagName: 'div',
          classNames: 'total__info',
          children: [
            create({
              tagName: 'div',
              classNames: 'total__info__count',
              children: [
                `Products: `,
                create({
                  tagName: 'i',
                  children: `${this.countItems}`
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'total__info__num',
              children: [
                `Total: `,
                create({
                  tagName: 'i',
                  children: `${this.totalSum}$`
                })
              ]
            }),
            create({
              tagName: 'div',
              children: [inputPromo]
            }),
            create({
              tagName: 'div',
              classNames: 'total__info__promo-code-hint',
              children: [
                `Promo for test: `,
                create({
                  tagName: 'i',
                  children: `${promoArr.join(', ')}`
                })
              ]
            }),
            buyBtn
          ]
        })
      ],
      parent: this.parent
    });
  };
}
