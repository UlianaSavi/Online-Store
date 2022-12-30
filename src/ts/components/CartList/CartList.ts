import { create } from '../../utils/create';
import { IProduct } from '../../types';

interface ICartListProps {
  items: IProduct[];
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

    let numInList = 0;
    const productItem =
      props?.items.map((item) => {
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
                    ['src', `${item.images.at(0)}`],
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
                  children: `${item.name}`
                }),
                create({
                  tagName: 'div',
                  classNames: 'line'
                }),
                create({
                  tagName: 'div',
                  classNames: 'item__descr__text',
                  children: `${item.description}`
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
                          children: `${item.popularity}`
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
                      children: `${item.stock}`
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
                      children: `${item.price}`
                    })
                  ]
                })
              ]
            })
          ]
        });
        return items;
      }) || [];

    this.component = create({
      tagName: 'div',
      classNames: 'product-list',
      children: [header, ...productItem],
      parent: this.parent
    });
  };
}
