import { create } from '../../utils/create';
import { IProduct } from '../../types';

interface IProductsProps {
  items: IProduct[];
  addToCartClickHandler?: (id: number) => void;
}
export class Products {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props?: IProductsProps) => {
    this.render(props);
  };

  render = (props?: IProductsProps) => {
    console.log(props);

    this.component?.remove();

    const viewMain = create({
      tagName: 'div',
      classNames: 'products__header__view-main view-active',
      children: [
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),

        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        })
      ]
    });

    const viewBig = create({
      tagName: 'div',
      classNames: 'products__header__view-big',
      children: [
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),

        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        }),
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        })
      ]
    });

    const productItem = props?.items.map((item) => {
      const addToCartBtn = create({
        tagName: 'button',
        classNames: 'btn btn__right-padding',
        children: 'Add to cart'
      });

      const detailsLink = create({
        tagName: 'a',
        classNames: 'btn',
        dataAttr: [['href', `/item/${item.id}`]],
        children: 'Details'
      });

      if (props.addToCartClickHandler) {
        addToCartBtn.addEventListener('click', () => {
          if (item.id) {
            props?.addToCartClickHandler?.(item.id);
          }
        });
      }

      const items = create({
        tagName: 'div',
        classNames: 'products__table__item',
        children: [
          create({
            tagName: 'div',
            classNames: 'products__table__item-title',
            children: item.name
          }),
          create({
            tagName: 'div',
            classNames: 'products__table__item-inner',
            children: [
              create({
                tagName: 'div',
                classNames: 'products__table__item-img',
                children: [
                  create({
                    tagName: 'img',
                    dataAttr: [['src', item?.images?.at(0) || '']] // img
                  })
                ]
              }),
              create({
                tagName: 'div',
                classNames: 'products__table__item-info',
                children: [
                  create({
                    tagName: 'span',
                    children: [
                      'Price: ',
                      create({
                        tagName: 'i',
                        children: `${item.price}` // price
                      })
                    ]
                  }),
                  create({
                    tagName: 'span',
                    children: [
                      'Stock: ',
                      create({
                        tagName: 'i',
                        children: `${item.stock}` // сюда подставь цену динамично
                      })
                    ]
                  })
                ]
              }),
              addToCartBtn,
              detailsLink
            ]
          })
        ]
      });

      return items;
    });

    this.component = create({
      tagName: 'div',
      classNames: 'products',
      children: [
        create({
          tagName: 'div',
          classNames: 'products__header',
          children: [
            create({
              tagName: 'div',
              classNames: 'sort__list__btn btn',
              children: [
                create({
                  tagName: 'span',
                  classNames: 'sort__list__btn-text',
                  children: ['Sort by:']
                }),
                create({
                  tagName: 'div',
                  classNames: 'triangle-down'
                })
              ]
            }),
            create({
              tagName: 'span',
              classNames: 'sort__items__count',
              children: [
                'Found:',
                create({
                  tagName: 'i',
                  children: ' 40'
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'products__header__views',
              children: [viewMain, viewBig]
            })
          ]
        }),
        create({
          tagName: 'div',
          classNames: 'products__table',
          children: productItem
        })
      ],
      parent: this.parent
    });
  };
}
