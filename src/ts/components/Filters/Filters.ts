import { create } from '../../utils/create';

interface IFilterProps {
  categories: string[];
  names: string[];
}
export class Filters {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  onFilterClick: (item: string, enabled: boolean) => void;
  onNameClick: (item: string, enabled: boolean) => void;

  constructor(
    parent: HTMLElement | null,
    onFilterClick: (item: string, enabled: boolean) => void,
    onNameClick: (item: string, enabled: boolean) => void
  ) {
    this.parent = parent;
    this.component = null;
    this.onFilterClick = onFilterClick;
    this.onNameClick = onNameClick;
  }

  update = (props?: IFilterProps) => {
    this.render(props);
  };

  render = (props?: IFilterProps) => {
    this.component?.remove();

    const btnReset = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'Reset Filters',
      dataAttr: [['id', 'btnReset']]
    });

    const btnCopy = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'Copy',
      dataAttr: [['id', 'btnCopy']]
    });

    const nameItem = props?.names.map((item) => {
      const checkBox = create({
        tagName: 'input',
        classNames: 'custom__checkbox',
        dataAttr: [
          ['type', 'checkbox'],
          ['id', item]
        ]
      }) as HTMLInputElement;

      const element = create({
        tagName: 'div',
        classNames: 'filters__item__list__item',
        children: [
          checkBox,
          create({
            tagName: 'label',
            classNames: 'label',
            dataAttr: [['for', item]],
            children: item
          }),
          create({
            tagName: 'span',
            classNames: 'list__name',
            children: '(10/10)'
          })
        ]
      });

      checkBox.addEventListener('click', () => this.onNameClick(item, checkBox.checked));
      return element;
    });

    const categoryItem = props?.categories.map((item) => {
      const checkBox = create({
        tagName: 'input',
        classNames: 'custom__checkbox',
        dataAttr: [
          ['type', 'checkbox'],
          ['id', item]
        ]
      }) as HTMLInputElement;
      const element = create({
        tagName: 'div',
        classNames: 'filters__item__list__item',
        children: [
          checkBox,
          create({
            tagName: 'label',
            classNames: 'label',
            dataAttr: [['for', item]],
            children: item
          }),
          create({
            tagName: 'span',
            classNames: 'list__name',
            children: `(${10}/10)`
          })
        ]
      });

      checkBox.addEventListener('click', () => this.onFilterClick(item, checkBox.checked));
      return element;
    });

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
                  children: 'Category'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'filters__item__list',
                  children: categoryItem
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
                  children: 'Name'
                }),
                titleSubline,
                create({
                  tagName: 'div',
                  classNames: 'filters__item__list',
                  children: nameItem
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
                  children: 'Price'
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
                          classNames: 'range__text__span',
                          children: [
                            'From ',
                            create({
                              tagName: 'span',
                              children: '10 $',
                              dataAttr: [['id', 'min__range']]
                            })
                          ]
                        }),
                        '⟷',
                        create({
                          tagName: 'span',
                          children: [
                            'To  ',
                            create({
                              tagName: 'span',
                              children: '10000 $',
                              dataAttr: [['id', 'max__range']]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'div',
                      children: `
                        <input data-role="doubleslider" class="input-range ultra-thin cycle-marker"/>
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
                  children: 'Stock'
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
                          classNames: 'range__text__span',
                          children: [
                            'From ',
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
                            'To  ',
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
                      <input data-role="doubleslider" class="input-range ultra-thin cycle-marker"/>
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
