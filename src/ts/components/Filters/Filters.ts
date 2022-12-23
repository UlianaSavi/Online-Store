import { create } from '../../utils/create';

interface IFilterProps {
  categories: string[];
  names: string[];
}

export class Filters {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = (props?: IFilterProps) => {
    this.render(props);
  };

  render = (props?: IFilterProps) => {
    console.log(props);

    this.component?.remove();

    const btnReset = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'Сбросить фильтры',
      dataAttr: [['id', 'btnReset']]
    });

    const btnCopy = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'Cкопировать',
      dataAttr: [['id', 'btnCopy']]
    });

    const filtersItem = props?.categories.map((item) =>
      create({
        tagName: 'div',
        classNames: 'filters__item__list__item',
        children: [
          create({
            tagName: 'input',
            classNames: 'custom__checkbox',
            dataAttr: [
              ['type', 'checkbox'],
              ['id', item]
            ]
          }),
          create({
            tagName: 'label',
            dataAttr: [['for', item]],
            children: item
          }),
          create({
            tagName: 'span',
            classNames: 'list__name',
            children: '(10/10)'
          })
        ]
      })
    );

    const titleSubline = create({
      tagName: 'div',
      classNames: 'filters__item__title__subline'
    });

    this.component = create({
      tagName: 'div',
      classNames: 'filters',
      children: [
        create({
          tagName: 'div',
          classNames: 'reset',
          children: [btnReset, btnCopy]
        }),
        create({
          tagName: 'div',
          classNames: 'filters__items',
          children: [
            create({
              tagName: 'div',
              classNames: 'filters__item',
              children: [
                create({
                  tagName: 'h3',
                  classNames: 'filters__item__title',
                  children: 'Категория'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'filters__item__list',
                  children: filtersItem
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'filters__item',
              children: [
                create({
                  tagName: 'h3',
                  classNames: 'filters__item__title',
                  children: 'Названиe произведения'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'filters__item__list',
                  children: filtersItem
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'filters__item',
              children: [
                create({
                  tagName: 'h3',
                  classNames: 'filters__item__title',
                  children: 'Цена'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'range',
                  children: [
                    create({
                      tagName: 'div',
                      classNames: 'range__text',
                      children: [
                        create({
                          tagName: 'span',
                          classNames: 'range__text',
                          children: [
                            'От ',
                            create({
                              tagName: 'span',
                              children: '10 руб.',
                              dataAttr: [['id', 'min__range']]
                            })
                          ]
                        }),
                        '⟷',
                        create({
                          tagName: 'span',
                          children: [
                            'До ',
                            create({
                              tagName: 'span',
                              children: '10000 руб.',
                              dataAttr: [['id', 'max__range']]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      children: `
                        <input data-role="doubleslider" class="ultra-thin cycle-marker"/>
                        `
                    })
                  ]
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'filters__item',
              children: [
                create({
                  tagName: 'h3',
                  classNames: 'filters__item__title',
                  children: 'Количество на складе'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'range',
                  children: [
                    create({
                      tagName: 'div',
                      classNames: 'range__text',
                      children: [
                        create({
                          tagName: 'span',
                          classNames: 'range__text',
                          children: [
                            'От ',
                            create({
                              tagName: 'span',
                              children: '2.',
                              dataAttr: [['id', 'min__range2']]
                            })
                          ]
                        }),
                        '⟷',
                        create({
                          tagName: 'span',
                          children: [
                            'До ',
                            create({
                              tagName: 'span',
                              children: '1000.',
                              dataAttr: [['id', 'max__range2']]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      children: `
                      <input data-role="doubleslider" class="ultra-thin cycle-marker"/>
                      `
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
