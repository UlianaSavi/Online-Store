import { create } from '../../utils/create';
import { IProduct } from '../../types';
import { Controller } from '../../controllers/controller';

interface ICartListProps {
  items: IProduct[];
}
export class CartList {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  controller: Controller;

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.controller = controller;
  }

  update = (props?: ICartListProps) => {
    this.render(props);
  };

  render = (props?: ICartListProps) => {
    this.component?.remove();
    const inputLimit = create({
      tagName: 'input',
      dataAttr: [['type', 'number'], ['min', '1'], ['max', '6'], ['placeholder', "LIMIT"], ['value', '3']],
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
          children: [
            btnLeft,
            pageNumber,
            btnRight
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

    // pagination
    // numInList
    // inputLimit
    // productItem
    // let countOfPages = 1;
    let pageCounter = 1;
    pageNumber.textContent = `${pageCounter}`
    let countOfPages = Math.ceil(numInList / +inputLimit.value);

    this.controller.isDisabled(countOfPages, pageCounter, btnLeft, btnRight);
    
    btnRight.addEventListener('click', () => {
      if (pageCounter !== countOfPages) {
        pageNumber.textContent = `${++pageCounter}`;
      }
      this.controller.isDisabled(countOfPages, pageCounter, btnLeft, btnRight);  
    })

    btnLeft.addEventListener('click', () => {
      if (pageCounter !== 1) {
        pageNumber.textContent = `${--pageCounter}`;
      }
      this.controller.isDisabled(countOfPages, pageCounter, btnLeft, btnRight);  
    })    
    
    inputLimit.addEventListener('input', () => {
      if (inputLimit.value) {
        countOfPages = Math.ceil(numInList / +inputLimit.value);
      }
    })
    console.log('count of pages ' + countOfPages);
    
  };
}
