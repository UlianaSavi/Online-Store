import { create } from '../../utils/create';
import { Controller } from '../../controllers/controller';

interface PromoArr {
  name: string;
  discount: string;
}

export class Total {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  controller: Controller;
  countItems: number;
  totalSum: number;
  currPromoName: string;
  currPromoDiscount: string;
  addPromo: HTMLDivElement | null;
  addPromoWrapper: HTMLElement | null;
  addedPromoArr: PromoArr[];

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.controller = controller;
    this.countItems = 10;
    this.totalSum = 1000;
    this.currPromoName = '';
    this.currPromoDiscount = '';
    this.addPromo = null;
    this.addPromoWrapper = null;
    this.addedPromoArr = [];
  }

  update = () => {
    this.render();
  };

  render = () => {
    this.component?.remove();

    const promoArr: PromoArr[] = [
      { name: 'SHIT', discount: '10' },
      { name: '2SHIT', discount: '20' }
    ];

    const inputPromo = create({
      tagName: 'input',
      classNames: 'total__info__promo-code promo-input input',
      dataAttr: [
        ['type', 'search'],
        ['name', 'search-promo'],
        ['placeholder', 'Enter promo code']
      ]
    }) as HTMLInputElement;

    inputPromo.addEventListener('input', () => {
      if (inputPromo.value) {
        for (let index = 0; index < promoArr.length; index++) {
          if (promoArr[index].name === inputPromo.value.toUpperCase()) {
            this.currPromoName = promoArr[index].name;
            this.currPromoDiscount = promoArr[index].discount;
            setTimeout(() => this.render(), 400);
            break;
          } else {
            this.controller.removePromo(this.addPromoWrapper, this.addPromo);
          }
        }
      }
    });

    const totalBlock = create({
      tagName: 'div',
      classNames: 'total__info__num',
      children: [
        `Total: `,
        create({
          tagName: 'i',
          children: `${this.totalSum}$`
        })
      ]
    });

    const newTotalBlock = create({
      tagName: 'div',
      classNames: 'total__info__num_new-total',
      children: [
        `Total: `,
        create({
          tagName: 'i',
          children: `${
            this.totalSum -
            (this.totalSum * this.addedPromoArr.reduce((prev, curr) => prev + +curr.discount, 0)) /
              100
          }$`
        })
      ]
    });

    const addedPromo = create({
      tagName: 'div',
      classNames: `added-promo__promo-list`
    });

    const addedPromoBlock = create({
      tagName: 'div',
      classNames: 'added-promo'
    });

    for (let index = 0; index < this.addedPromoArr.length; index++) {
      const removePromoBtn = create({
        tagName: 'button',
        classNames: 'added-promo__btn',
        children: '+'
      });

      removePromoBtn.addEventListener('click', () => {
        this.addedPromoArr.splice(index, 1);
        this.render();
      });

      addedPromo.appendChild(
        create({
          tagName: 'div',
          classNames: 'added-promo__promo',
          children: [
            `${this.addedPromoArr[index].name} - ${this.addedPromoArr[index].discount}%`,
            removePromoBtn
          ]
        })
      );
    }

    const addPromoBtn = create({
      tagName: 'button',
      classNames: 'add-promo__btn',
      children: '+'
    });

    addPromoBtn.addEventListener('click', () => {
      this.addedPromoArr.push({ name: this.currPromoName, discount: this.currPromoDiscount });
      this.controller.removePromo(this.addPromoWrapper, this.addPromo);
      this.currPromoName = '';
      this.render();
    });

    if (this.addedPromoArr.length > 0) {
      totalBlock.classList.add('total__info__num_through');
      newTotalBlock.classList.add('total__info__num_new-total_active');
      addedPromoBlock.appendChild(
        create({
          tagName: 'div',
          classNames: 'added-promo__header',
          children: `Added promo codes:`
        })
      );
      addedPromoBlock.appendChild(addedPromo);
    }

    this.addPromo = create({
      tagName: 'div',
      classNames: 'add-promo',
      children: [
        create({
          tagName: 'span',
          children: `${this.currPromoName} - ${this.currPromoDiscount}%`
        }),
        addPromoBtn
      ]
    }) as HTMLDivElement;

    this.addPromoWrapper = create({
      tagName: 'div',
      classNames: 'input-promo-wrapper',
      children: [inputPromo, this.addPromo]
    }) as HTMLDivElement;

    if (this.currPromoName.length !== 0) {
      if (this.addedPromoArr.length === 0) {
        setTimeout(() => {
          this.addPromoWrapper?.classList.add('input-promo-wrapper_active');
          this.addPromo?.classList.add('add-promo_active');
        }, 600);
      } else {
        const filtredArr = this.addedPromoArr
          .map((item) => item.name)
          .filter((item) => item === this.currPromoName);
        if (filtredArr.length === 0) {
          setTimeout(() => {
            this.addPromoWrapper?.classList.add('input-promo-wrapper_active');
            this.addPromo?.classList.add('add-promo_active');
          }, 600);
        } else {
          inputPromo.autofocus = true;
        }
      }
    }

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
            totalBlock,
            newTotalBlock,
            addedPromoBlock,
            this.addPromoWrapper,
            create({
              tagName: 'div',
              classNames: 'total__info__promo-code-hint',
              children: [
                `Promo for test: `,
                create({
                  tagName: 'i',
                  children: `${promoArr.map((item) => item.name).join(', ')}`
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
