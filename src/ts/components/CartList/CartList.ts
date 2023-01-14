import { create } from '../../utils/create';
import { Controller } from '../../controllers/controller';
import { Total } from '../CartTotal/CartTotal';
import { parseUrlParams } from '../../utils/url';
import { Header } from '../Header/Header';
import { PageCart } from '../../pages/PageCart/PageCart';

export class CartList {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  controller: Controller;
  pageCounter: number;
  itemsLimit: number;
  total: Total;
  header: Header;
  cartPage: PageCart;

  constructor(
    parent: HTMLElement | null,
    controller: Controller,
    total: Total,
    header: Header,
    pageCart: PageCart
  ) {
    this.parent = parent;
    this.component = null;
    this.controller = controller;
    this.pageCounter = 1;
    this.itemsLimit = 3;
    this.total = total;
    this.header = header;
    this.cartPage = pageCart;
  }

  update = () => {
    this.render();
  };

  render = () => {
    let numInList = 0;
    const productItem =
      this.controller.getCurrentCartProducts().map((item) => {
        const minusBtn = create({
          tagName: 'button',
          classNames: 'btn',
          children: `&#10134;`
        });

        const plusBtn = create({
          tagName: 'button',
          classNames: 'btn',
          children: `&#10133;`
        });

        minusBtn.addEventListener('click', () => {
          this.controller.decreaseAmountOfExistingCartProduct(item.product, 1);
          if (this.controller.getCurrentCartProducts().length === 0) {
            this.cartPage.unmount();
            this.cartPage.mount();
          }
        });

        plusBtn.addEventListener('click', () => {
          if (item.product.stock > item.amount) {
            this.controller.increaseAmountOfExistingCartProduct(item.product, 1);
          }
        });

        const items = create({
          tagName: 'div',
          classNames: 'product-list__item',
          children: [
            create({
              tagName: 'div',
              classNames: 'product-list__item__number',
              children: `${(numInList += 1)}`
            }),
            create({
              tagName: 'div',
              classNames: 'product-list__item__img',
              children: [
                create({
                  tagName: 'img',
                  classNames: 'product-list__item__img-img',
                  dataAttr: [
                    ['src', `${item.product.images.at(0)}`],
                    ['alt', 'Image of product']
                  ]
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'product-list__item__descr',
              children: [
                create({
                  tagName: 'div',
                  classNames: 'item__descr__name',
                  children: `${item.product.name}`
                }),
                create({
                  tagName: 'div',
                  classNames: 'line'
                }),
                create({
                  tagName: 'div',
                  classNames: 'item__descr__text',
                  children: `${item.product.description}`
                }),
                create({
                  tagName: 'div',
                  classNames: 'item__descr__other',
                  children: [
                    create({
                      tagName: 'div',
                      children: [
                        `Discount: `,
                        create({
                          tagName: 'i',
                          classNames: 'i',
                          children: '10 %'
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      children: [
                        `Popularity: `,
                        create({
                          tagName: 'i',
                          classNames: 'i',
                          children: `${item.product.popularity}`
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'product-list__item__details',
              children: [
                create({
                  tagName: 'span',
                  classNames: 'item__details__stock',
                  children: [
                    `Stock: `,
                    create({
                      tagName: 'i',
                      children: `${item.product.stock}`
                    })
                  ]
                }),
                create({
                  tagName: 'div',
                  classNames: 'item__details__count-controls',
                  children: [
                    minusBtn,
                    create({
                      tagName: 'span',
                      classNames: 'item__details__count',
                      children: `${item.amount}`
                    }),
                    plusBtn
                  ]
                }),
                create({
                  tagName: 'span',
                  classNames: 'item__details__price',
                  children: [
                    `Price: `,
                    create({
                      tagName: 'i',
                      children: `${item.product.price * item.amount}`
                    })
                  ]
                })
              ]
            })
          ]
        });
        return items;
      }) || [];

    this.component?.remove();

    const params = parseUrlParams();
    if (params.page) this.pageCounter = +params.page;
    if (params.pageSize) this.itemsLimit = +params.pageSize;

    const inputLimit = create({
      tagName: 'input',
      dataAttr: [
        ['type', 'number'],
        ['min', '1'],
        ['max', `${productItem.length}`],
        ['placeholder', 'LIMIT'],
        ['value', `${this.itemsLimit}`]
      ],
      classNames: 'page-input'
    }) as HTMLInputElement;

    const btnLeft = create({
      tagName: 'button',
      classNames: 'btn',
      children: `&#10094;`
    }) as HTMLButtonElement;

    const btnRight = create({
      tagName: 'button',
      classNames: 'btn',
      children: `&#10095;`
    }) as HTMLButtonElement;

    const pageNumber = create({
      tagName: 'span',
      classNames: 'page-numbers__number'
    });

    const header = create({
      tagName: 'div',
      classNames: 'product-list__header',
      children: [
        create({
          tagName: 'h3',
          classNames: 'product-list__header__title h3',
          children: 'TITLE'
        }),
        create({
          tagName: 'div',
          classNames: 'product-list__header__limit',
          children: [inputLimit]
        }),
        create({
          tagName: 'div',
          classNames: 'product-list__header__page-numbers',
          children: [btnLeft, pageNumber, btnRight]
        })
      ]
    });

    // pagination
    if (this.itemsLimit * this.pageCounter - this.itemsLimit >= numInList) {
      this.pageCounter = Math.ceil(numInList / +inputLimit.value);
    }
    const lastItem = this.itemsLimit * this.pageCounter;
    const firstItem = lastItem - this.itemsLimit;
    const currentItems = productItem.slice(firstItem, lastItem);
    let countOfPages = Math.ceil(numInList / +inputLimit.value);
    this.controller.isDisabled(countOfPages, this.pageCounter, btnLeft, btnRight);

    pageNumber.textContent = `${this.pageCounter}`;


    btnRight.addEventListener('click', () => {
      if (this.pageCounter !== countOfPages) {
        pageNumber.textContent = `${++this.pageCounter}`;
      }
      this.controller.isDisabled(countOfPages, this.pageCounter, btnLeft, btnRight);
      this.controller.cartQuery(this.pageCounter, this.itemsLimit);
      this.render();
    });

    btnLeft.addEventListener('click', () => {
      if (this.pageCounter !== 1) {
        pageNumber.textContent = `${--this.pageCounter}`;
      }
      this.controller.isDisabled(countOfPages, this.pageCounter, btnLeft, btnRight);
      this.controller.cartQuery(this.pageCounter, this.itemsLimit);
      this.render();
    });

    inputLimit.addEventListener('input', () => {
      if (inputLimit.value) {
        countOfPages = Math.ceil(numInList / +inputLimit.value);
        if (countOfPages < this.pageCounter) {
          this.pageCounter = countOfPages;
          this.itemsLimit = +inputLimit.value;
          this.controller.cartQuery(this.pageCounter, this.itemsLimit);
          this.render();
        }
      }
      this.itemsLimit = +inputLimit.value;
      this.controller.isDisabled(countOfPages, this.pageCounter, btnLeft, btnRight);
      this.controller.cartQuery(this.pageCounter, this.itemsLimit);
      this.render();
    });

    this.component = create({
      tagName: 'div',
      classNames: 'product-list',
      children: [header, ...currentItems],
      parent: this.parent
    });
    const amounts = this.controller.getCurrentCartProducts().map((item) => item.amount);
    if (amounts) this.total.countItems = amounts.reduce((prev, curr) => prev + curr, 0);
    const productItemPrices = this.controller
      .getCurrentCartProducts()
      .map((item) => item.product.price * item.amount);
    if (productItemPrices)
      this.total.totalSum = productItemPrices.reduce((prev, curr) => prev + curr, 0);
    this.total.update();
  };
}
