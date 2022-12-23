import { IAppState } from '../../types';
import { create } from '../../utils/create';

export class MainHTML {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props: IAppState) => {
    this.render(props);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render = (props?: IAppState) => {
    this.component?.remove();

    this.component = create({
      tagName: 'div',
      classNames: 'main__wrapper',
      children: [
        create({
          tagName: 'h2',
          classNames: 'main__header',
          children: 'Каталог'
        }),
        // Временно
        create({
          tagName: 'a',
          dataAttr: [
            ['href', '/filter'],
            ['id', 'filter']
          ],
          children: `To Filter Page`
        }),
        create({
          tagName: 'aside',
          classNames: 'main__catalog',
          children: [
            create({
              tagName: 'ul',
              classNames: 'catalog-list',
              children: [
                create({
                  tagName: 'li',
                  classNames: "catalog-list__category",
                  children: 'Канцелярия'
                }),
                create({
                  tagName: 'li',
                  classNames: "catalog-list__category",
                  children: 'Фигурки'
                }),
                create({
                  tagName: 'li',
                  classNames: "catalog-list__category",
                  children: 'Манга'
                }),
                create({
                  tagName: 'li',
                  classNames: "catalog-list__category",
                  children: 'Косплей'
                }),
              ]
            })
          ]
        }),
        create({
          tagName: 'h3',
          classNames: 'main__header',
          children: 'Хиты продаж'
        }),
        create({
          tagName: 'article',
          classNames: "main__popular-items",
          children: [
            create({
              tagName: 'div',
              classNames: "popular-items__wrapper",
              children: [
                create({
                  tagName: 'div',
                  classNames: "popular-items__most-popular-item",
                  children: [
                    create({
                      tagName: 'div',
                      classNames: "popular-items__item",
                      children: [
                        create({
                          tagName: 'img',
                          classNames: "popular-items__img",
                          dataAttr: [
                            ['src', './assets/img/bloknotKlinok.jpg'],
                            ['alt', 'item photo']
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: "popular-items__name-and-price",
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: `Блокнот охотника на демонов  325 р.`
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                create({
                  tagName: 'div',
                  classNames: "popular-items__others-popular-items",
                  children: [
                    create({
                      tagName: 'div',
                      classNames: "popular-items__item",
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', "./assets/img/figurinesBleanch1.jpg"],
                            ['alt', "item photo"]
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: 'popular-items__name-and-price',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: [
                                create({
                                  tagName: 'span',
                                  classNames: 'popular-items__item-name',
                                  children: `Фигурка из аниме «Блич» 120 р.`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: "popular-items__item",
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', "./assets/img/bookOnePunchMan2.jpg"],
                            ['alt', "item photo"]
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: 'popular-items__name-and-price',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: [
                                create({
                                  tagName: 'span',
                                  classNames: 'popular-items__item-name',
                                  children: `Плакат Гароу 304 р.`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: "popular-items__item",
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', "./assets/img/cosplayNaruto3.jpg"],
                            ['alt', "item photo"]
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: 'popular-items__name-and-price',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: [
                                create({
                                  tagName: 'span',
                                  classNames: 'popular-items__item-name',
                                  children: `Косплей костюм Какаши Хатаке 2990 р.`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: "popular-items__item",
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', "./assets/img/mangaonePiece2.jpeg"],
                            ['alt', "item photo"]
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: 'popular-items__name-and-price',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: [
                                create({
                                  tagName: 'span',
                                  classNames: 'popular-items__item-name',
                                  children: `Манга One Piece. Большой куш. Кн.4. Ода Э. 927 р.`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ],
      parent: this.parent
    })
    return this.component;
  }
}