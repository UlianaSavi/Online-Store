import { create } from '../../utils/create';

interface ICartListProps {
  categories: string[];
  names: string[];
}
export class CartList {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props?: ICartListProps) => {
    this.render(props);
  };

  render = (props?: ICartListProps) => {
    this.component?.remove();
    console.log(props);

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
          children: `<input type="number" min="1" max="6" class="page-input" placeholder="LIMIT"></input>`
        }),
        create({
          tagName: 'div',
          classNames: 'product-list__header__page-numbers',
          children: [
            create({
              tagName: 'button',
              classNames: 'btn',
              children: `&#10094;`
            }),
            create({
              tagName: 'span',
              classNames: 'page-numbers__number',
              children: '1'
            }),
            create({
              tagName: 'button',
              classNames: 'btn',
              children: `&#10095;`
            })
          ]
        })
      ]
    });

    const productItem = create({
      tagName: 'div',
      classNames: 'product-list__item',
      children: [
        create({
          tagName: 'div',
          classNames: 'product-list__item__number',
          children: '1'
        }),
        create({
          tagName: 'div',
          classNames: 'product-list__item__img',
          children: [
            create({
              tagName: 'img',
              classNames: 'product-list__item__img-img',
              dataAttr: [
                ['src', './assets/img/bleachPenal1.jpg'],
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
              children: 'Name'
            }),
            create({
              tagName: 'div',
              classNames: 'line'
            }),
            create({
              tagName: 'div',
              classNames: 'item__descr__text',
              children: 'Some shit about this product about this product about this product'
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
                      children: '5.0'
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
                  children: '100'
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'item__details__count-controls',
              children: [
                create({
                  tagName: 'button',
                  classNames: 'btn',
                  children: `&#10134;`
                }),
                create({
                  tagName: 'span',
                  classNames: 'item__details__count',
                  children: `1`
                }),
                create({
                  tagName: 'button',
                  classNames: 'btn',
                  children: `&#10133;`
                })
              ]
            }),
            create({
              tagName: 'span',
              classNames: 'item__details__price',
              children: [
                `Price: `,
                create({
                  tagName: 'i',
                  children: '1000$'
                })
              ]
            })
          ]
        })
      ]
    });

    const buyBtn = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'BUY NOW'
    });

    const total = create({
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
                  children: '10'
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
                  children: '1000$'
                })
              ]
            }),
            create({
              tagName: 'div',
              children: `<input class="total__info__promo-code promo-input input" type="search" name="search-promo" id="" placeholder="Enter promo code">`
            }),
            create({
              tagName: 'div',
              classNames: 'total__info__promo-code-hint',
              children: [
                `Promo for test: `,
                create({
                  tagName: 'i',
                  children: [`"SHIT", "SHIT2"`]
                })
              ]
            }),
            buyBtn
          ]
        })
      ]
    });

    const productList = create({
      tagName: 'div',
      classNames: 'product-list',
      children: [header, productItem]
    });

    this.component = create({
      tagName: 'div',
      classNames: 'cart__wrapper',
      children: [productList, total],
      parent: this.parent
    });
  };
}
