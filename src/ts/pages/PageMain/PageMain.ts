// import { Controller } from '../../controllers/controller';
import { create } from '../../utils/create';

export class PageMain {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  // controller: Controller;
  go: (event: Event) => void;

  constructor(parent: HTMLElement | null, go: (event: Event) => void) {
    this.parent = parent;
    this.component = null;
    this.go = go;
    // this.controller = Controller(this.model);
  }

  unmount = () => {
    this.component?.remove();
  };

  mount = () => {
    const toFilterPageBtn = create({
      tagName: 'a',
      children: `Let's shopping!`,
      dataAttr: [
        ['id', 'filter'],
        ['href', '/filter']
      ]
    });

    toFilterPageBtn.addEventListener('click', this.go);

    this.component = create({
      tagName: 'div',
      classNames: 'main__wrapper',
      children: [
        create({
          tagName: 'h2',
          classNames: 'main__header',
          children: 'Catalog'
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
                  classNames: 'catalog-list__category',
                  children: [toFilterPageBtn]
                })
              ]
            })
          ]
        }),
        create({
          tagName: 'h3',
          classNames: 'main__header',
          children: 'Sales hits'
        }),
        create({
          tagName: 'article',
          classNames: 'main__popular-items',
          children: [
            create({
              tagName: 'div',
              classNames: 'popular-items__wrapper',
              children: [
                create({
                  tagName: 'div',
                  classNames: 'popular-items__most-popular-item',
                  children: [
                    create({
                      tagName: 'div',
                      classNames: 'popular-items__item',
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', './assets/img/bloknotKlinok.jpg'],
                            ['alt', 'item photo']
                          ]
                        }),
                        create({
                          tagName: 'div',
                          classNames: 'popular-items__name-and-price',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'popular-items__name-and-price-wrapper',
                              children: `The notebook of the demon hunter 325 $`
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                create({
                  tagName: 'div',
                  classNames: 'popular-items__others-popular-items',
                  children: [
                    create({
                      tagName: 'div',
                      classNames: 'popular-items__item',
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', './assets/img/figurinesBleanch1.jpg'],
                            ['alt', 'item photo']
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
                                  children: `Figure from the anime «Bleach» 120 $`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: 'popular-items__item',
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', './assets/img/bookOnePunchMan2.jpg'],
                            ['alt', 'item photo']
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
                                  children: `Garowe Poster 304 $`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: 'popular-items__item',
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', './assets/img/cosplayNaruto3.jpg'],
                            ['alt', 'item photo']
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
                                  children: `Kakashi Hatake Cosplay Costume 2990 $`
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      classNames: 'popular-items__item',
                      children: [
                        create({
                          tagName: 'img',
                          classNames: 'popular-items__img',
                          dataAttr: [
                            ['src', './assets/img/mangaonePiece2.jpeg'],
                            ['alt', 'item photo']
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
                                  children: `Manga One Piece.The Big jackpot. Book 4. Ode to E. 927 $`
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
    });
  };
}
