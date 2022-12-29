import { create } from '../../utils/create';
import { IProduct } from '../../types';
interface IDetailsProps {
  item: IProduct;
}
export class Details {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  go: (event: Event) => void;

  constructor(parent: HTMLElement | null, go: (event: Event) => void) {
    this.parent = parent;
    this.component = null;
    this.go = go;
  }

  update = (props?: IDetailsProps) => {
    this.render(props);
  };

  render = (props?: IDetailsProps) => {
    this.component?.remove();

    const slideOne = create({
      tagName: 'div',
      classNames: 'product__card__info-slides-slide__container active',
      children: [
        create({
          tagName: 'img',
          classNames: 'slides-image',
          dataAttr: [
            ['src', props?.item?.images?.at(0) || ''], // позже добавим не такой url, а в зависимости от выбранного товара
            ['alt', 'Product image']
          ]
        })
      ]
    });

    const slideTwo = create({
      tagName: 'div',
      classNames: 'product__card__info-slides-slide__container',
      children: [
        create({
          tagName: 'img',
          classNames: 'slides-image',
          dataAttr: [
            ['src', props?.item?.images?.at(1) || ''],
            ['alt', 'Product image']
          ]
        })
      ]
    });

    const mainImg = create({
      tagName: 'div',
      classNames: 'product__card__img',
      children: [
        create({
          tagName: 'img',
          classNames: 'product__card__img-img',
          dataAttr: [
            ['src', props?.item?.images?.at(0) || ''], // а тут url картинки еще и в зависимости от нажатого слайда
            ['alt', 'Main product image']
          ]
        })
      ]
    });

    const slides = create({
      tagName: 'div',
      classNames: 'product__card__info-slides',
      children: [slideOne, slideTwo]
    });

    const descriptioFields = {
      popularity: 'Popularity',
      stock: 'Stock',
      animeName: 'From',
      category: 'Category',
      description: 'Description'
    };

    const descriptionItems = Object.entries(descriptioFields).map(([key, value]) =>
      create({
        tagName: 'div',
        classNames: 'product__card__descr-item',
        children: [
          create({
            tagName: 'div',
            classNames: 'product__card__descr-item__title',
            children: `${value}: `
          }),
          create({
            tagName: 'div',
            classNames: 'product__card__descr-item__text',
            children: `${props?.item?.[key as keyof IProduct]}` // пункты, подобные этому позже добавим в зависимости от выбранного товара
          })
        ]
      })
    );

    const description = create({
      tagName: 'div',
      classNames: 'product__card__descr',
      children: descriptionItems
    });

    const add = create({
      tagName: 'div',
      classNames: 'product__card__add',
      children: [
        create({
          tagName: 'span',
          classNames: 'product__card__add-price',
          children: `${props?.item?.price} ₽`
        }),
        create({
          tagName: 'a',
          classNames: 'btn',
          children: 'ADD TO CART'
        }),
        create({
          tagName: 'a',
          classNames: 'btn',
          children: 'BUY NOW'
        })
      ]
    });

    const productitem = create({
      tagName: 'div',
      classNames: 'product__card__info',
      children: [slides, mainImg, description, add]
    });

    const linkHome = create({
      tagName: 'a',
      classNames: 'link__nav-item',
      dataAttr: [['href', '/']],
      children: 'STORE'
    });

    linkHome.addEventListener('click', this.go);

    this.component = create({
      tagName: 'div',
      classNames: 'details__wrapper',
      children: [
        create({
          tagName: 'div',
          classNames: 'link__nav',
          children: [
            create({
              tagName: 'div',
              classNames: 'link__nav-wrapper',
              children: [
                linkHome,
                create({
                  tagName: 'span',
                  children: ' >> '
                }),
                create({
                  tagName: 'a',
                  classNames: 'link__nav-item',
                  children: 'CATEGORY'
                }),
                create({
                  tagName: 'span',
                  children: ' >> '
                }),
                create({
                  tagName: 'a',
                  classNames: 'link__nav-item',
                  children: 'NAME'
                }),
                create({
                  tagName: 'span',
                  children: ' >> '
                }),
                create({
                  tagName: 'a',
                  classNames: 'link__nav-item',
                  children: 'TITLE'
                })
              ]
            })
          ]
        }),
        create({
          tagName: 'div',
          classNames: 'product__card',
          children: [
            create({
              tagName: 'div',
              classNames: 'product__card-title',
              children: [
                create({
                  tagName: 'h1',
                  children: 'NAME'
                })
              ]
            }),
            productitem
          ]
        })
      ],
      parent: this.parent
    });
  };
}
