import { create } from '../../utils/create';
import { IProduct } from '../../types';
import { sortItems } from '../../contains';

interface IProductsProps {
  items: IProduct[];
  sort?: string;
  view?: string;
  currProductID?: number;
}
export class Products {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  addSorting: (str: string) => void;
  go: (event: Event) => void;
  changeView: (str: string) => void;

  constructor(
    parent: HTMLElement | null,
    addSorting: (str: string) => void,
    go: (event: Event) => void,
    changeView: (str: string) => void
  ) {
    this.parent = parent;
    this.component = null;
    this.addSorting = addSorting;
    this.go = go;
    this.changeView = changeView;
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
      classNames:
        !props?.view || props?.view === 'viewMain'
          ? 'products__header__view-main view-active'
          : 'products__header__view-main',
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
      classNames:
        props?.view === 'viewBig'
          ? 'products__header__view-big view-active'
          : 'products__header__view-big',
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
        classNames: 'btn btn__right-padding',
        children: 'Add to cart'
      });

      const detailsLink = create({
        tagName: 'a',
        classNames: 'btn',
        dataAttr: [['href', `/details/${item.id}`]],
        children: 'Details'
      });

      detailsLink.addEventListener('click', this.go);

      const items = create({
        tagName: 'div',
        classNames:
          !props?.view || props?.view === 'viewMain'
            ? 'products__table__item'
            : 'products__table__item view__big',
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

    viewBig.addEventListener('click', () => {
      this.changeView('viewBig');
    });

    viewMain.addEventListener('click', () => {
      this.changeView('viewMain');
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
