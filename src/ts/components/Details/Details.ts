import { create } from '../../utils/create';
import { ICartProduct, IProduct } from '../../types';
import { Controller } from '../../controllers/controller';

interface IDetailsProps {
  item: IProduct;
}
export class Details {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  go: (event: Event) => void;
  controller: Controller;

  constructor(parent: HTMLElement | null, go: (event: Event) => void, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.go = go;
    this.controller = controller;
  }

  update = (props: IDetailsProps) => {
    this.render(props);
  };

  render = (props: IDetailsProps) => {
    this.component?.remove();

    const slideOne = create({
      tagName: 'div',
      classNames: 'product__card__info-slides-slide__container active',
      children: [
        create({
          tagName: 'img',
          classNames: 'slides-image',
          dataAttr: [
            ['src', props?.item?.images?.at(0) || ''],
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
            ['src', props?.item?.images?.at(0) || ''],
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
            children: `${props?.item?.[key as keyof IProduct]}`
          })
        ]
      })
    );

    const description = create({
      tagName: 'div',
      classNames: 'product__card__descr',
      children: descriptionItems
    });

    const addToCartBtnDetails = create({
      tagName: 'a',
      classNames: 'btn',
      children: 'ADD TO CART'
    });

    addToCartBtnDetails.addEventListener('click', () => {
      if (addToCartBtnDetails.textContent === 'Add to cart') {
        const cartProduct: ICartProduct = {
          product: props?.item,
          amount: 1
        };
        this.controller.pushNewCartProduct(cartProduct);
      } else {
        this.controller.getCurrentCartProducts().map((i, index) => {
          if (i.product.id === props.item.id) {
            this.controller.removeCartProduct(index);
          }
        });
      }
      this.render(props);
    });

    if (this.controller.getCurrentCartProducts().length === 0) {
      addToCartBtnDetails.textContent = 'Add to cart';
    } else {
      if (
        this.controller.getCurrentCartProducts().filter((i) => i.product.id === props.item.id)
          .length !== 0
      ) {
        addToCartBtnDetails.textContent = 'Drop from cart';
      } else {
        addToCartBtnDetails.textContent = 'Add to cart';
      }
    }

    const add = create({
      tagName: 'div',
      classNames: 'product__card__add',
      children: [
        create({
          tagName: 'span',
          classNames: 'product__card__add-price',
          children: `${props?.item?.price} $`
        }),
        addToCartBtnDetails,
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
                  children: `${props?.item.category}`
                }),
                create({
                  tagName: 'span',
                  children: ' >> '
                }),
                create({
                  tagName: 'a',
                  classNames: 'link__nav-item',
                  children: `${props?.item.animeName}`
                }),
                create({
                  tagName: 'span',
                  children: ' >> '
                }),
                create({
                  tagName: 'a',
                  classNames: 'link__nav-item',
                  children: `${props?.item.name}`
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
                  children: `${props?.item.name}`
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
