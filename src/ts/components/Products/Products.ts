import { create } from '../../utils/create';
import { IProduct } from '../../types';
import { sortItems } from '../../contains';
import { PageCart } from '../../pages/PageCart/PageCart';

interface IProductsProps {
  items: IProduct[];
  sort?: string;
  addToCartClickHandler?: (id: number) => void;
}
export class Products {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  addSorting: (str: string) => void;
  pageCart: PageCart;

  constructor(parent: HTMLElement | null, addSorting: (str: string) => void, pageCart: PageCart) {
    this.parent = parent;
    this.component = null;
    this.addSorting = addSorting;
    this.pageCart = pageCart;
  }

  update = (props?: IProductsProps) => {
    this.render(props);
  };

  render = (props?: IProductsProps) => {
    this.component?.remove();

    const roundsMainCount = 16;
    const roundsBigCount = 36;

    const titleEmpty = !props?.items.length
      ? create({
          tagName: 'h2',
          classNames: 'empty__title',
          children: 'NOT PRODUCTS FOUND &#128579;'
        })
      : null;

    const viewMain = create({
      tagName: 'div',
      classNames: 'products__header__view-main view-active',
      children: new Array(roundsMainCount).fill(null).map(() =>
        create({
          tagName: 'div',
          classNames: 'round__shape',
          children: '.'
        })
      )
    });

    const viewBig = create({
      tagName: 'div',
      classNames: 'products__header__view-big',
      children: new Array(roundsBigCount).fill(null).map(() =>
        create({
          tagName: 'div',
          classNames: 'round__shape little',
          children: '.'
        })
      )
    });

    const productItem = props?.items.map((item) => {
      const addToCartBtn = create({
        tagName: 'button',
        classNames: 'btn btn__right-padding'
      });

      addToCartBtn.addEventListener('click', () => {
        if (addToCartBtn.textContent === 'Add to cart') {
          this.pageCart.items.push(item);
        } else {
          this.pageCart.items.map((i, index) => {
            if (i === item) {
              this.pageCart.items.splice(index, 1);
            }
          });
        }
        this.render(props);
      });

      if (this.pageCart.items.length === 0) {
        addToCartBtn.textContent = 'Add to cart';
      } else {
        if (this.pageCart.items.includes(item)) {
          addToCartBtn.textContent = 'Drop from cart';
        } else {
          addToCartBtn.textContent = 'Add to cart';
        }
      }

      const detailsLink = create({
        tagName: 'a',
        classNames: 'btn',
        dataAttr: [['href', `details/${item.id}`]],
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
                    classNames: 'img',
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
                    classNames: 'span',
                    children: [
                      'Price: ',
                      create({
                        tagName: 'i',
                        children: `${item.price}`
                      })
                    ]
                  }),
                  create({
                    tagName: 'span',
                    classNames: 'span',
                    children: [
                      'Stock: ',
                      create({
                        tagName: 'i',
                        children: `${item.stock}`
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

    const sortItemsArr = Object.entries(sortItems).map(([key, val]) => {
      const item = create({
        tagName: 'li',
        classNames: 'sort__list__items__item',
        children: val
      });

      item.addEventListener('click', () => {
        this.addSorting(key);
      });

      return item;
    });

    const sortList = create({
      tagName: 'ul',
      classNames: 'sort__list__items hidden',
      children: sortItemsArr
    });

    const sortBtnTitle = create({
      tagName: 'span',
      classNames: 'sort__list__btn-text',
      children: `Sort by: ${(props?.sort && sortItems[props.sort]) || ''}`
    });

    const sortBtn = create({
      tagName: 'div',
      classNames: 'sort__list__btn btn',
      children: [
        sortBtnTitle,
        create({
          tagName: 'div',
          classNames: 'triangle-down'
        })
      ]
    });

    sortBtn.addEventListener('click', () => {
      sortList.classList.contains('hidden')
        ? sortList.classList.remove('hidden')
        : sortList.classList.add('hidden');
    });

    this.component = create({
      tagName: 'div',
      classNames: 'products',
      children: [
        create({
          tagName: 'div',
          classNames: 'products__header',
          children: [
            sortBtn,
            sortList,
            create({
              tagName: 'span',
              classNames: 'sort__items__count',
              children: [
                'Found: ',
                create({
                  tagName: 'i',
                  children: `${props?.items.length}`
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
        }),
        titleEmpty
      ],
      parent: this.parent
    });
  };
}
