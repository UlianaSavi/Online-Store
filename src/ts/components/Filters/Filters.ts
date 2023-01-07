import { create } from '../../utils/create';

interface IFilterProps {
  categories: Array<{ name: string; count: number; baseCount: number }>;
  names: Array<{ name: string; count: number; baseCount: number }>;
  activeCategoriesFilters?: string[];
  activeNameFiltrs?: string[];
  maxVal?: number;
  minVal?: number;
  maxStocks?: number;
  minStocks?: number;
}
export class Filters {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  onFilterClick: (item: string, enabled: boolean) => void;
  onNameClick: (item: string, enabled: boolean) => void;
  onReSetClick: () => void;

  constructor(
    parent: HTMLElement | null,
    onFilterClick: (item: string, enabled: boolean) => void,
    onNameClick: (item: string, enabled: boolean) => void,
    onReSetClick: () => void
  ) {
    this.parent = parent;
    this.component = null;
    this.onFilterClick = onFilterClick;
    this.onNameClick = onNameClick;
    this.onReSetClick = onReSetClick;
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

    btnReset.addEventListener('click', () => this.onReSetClick());

    const btnCopy = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'Copy',
      dataAttr: [['id', 'btnCopy']]
    });

    btnCopy.addEventListener('click', () => {
      btnCopy.style.color = 'red';
      btnCopy.style.backgroundColor = 'rgb(83, 83, 83)';
      setTimeout(() => {
        btnCopy.style.color = 'rgb(83, 83, 83)';
        btnCopy.style.backgroundColor = '#ffbd59';
        navigator.clipboard.writeText(window.location.href);
      }, 1000);
    });

    const nameItem = props?.names.map((item) => {
      const dataAttr = [
        ['type', 'checkbox'],
        ['id', item.name]
      ];

      if (props?.activeNameFiltrs?.includes(item.name)) {
        dataAttr.push(['checked', '']);
      }
      const checkBox = create({
        tagName: 'input',
        classNames: 'custom__checkbox',
        dataAttr
      }) as HTMLInputElement;

      const element = create({
        tagName: 'div',
        classNames: 'filters__item__list__item',
        children: [
          checkBox,
          create({
            tagName: 'label',
            classNames: 'label',
            dataAttr: [['for', item.name]],
            children: item.name
          }),
          create({
            tagName: 'span',
            classNames: 'list__name',
            children: `(${item.count}/${item.baseCount})`
          })
        ]
      });

      checkBox.addEventListener('click', () => this.onNameClick(item.name, checkBox.checked));
      return element;
    });

    const categoryItem = props?.categories.map((item) => {
      const dataAttr = [
        ['type', 'checkbox'],
        ['id', item.name]
      ];

      if (props?.activeCategoriesFilters?.includes(item.name)) {
        dataAttr.push(['checked', '']);
      }
      const checkBox = create({
        tagName: 'input',
        classNames: 'custom__checkbox',
        dataAttr
      }) as HTMLInputElement;
      const element = create({
        tagName: 'div',
        classNames: 'filters__item__list__item',
        children: [
          checkBox,
          create({
            tagName: 'label',
            classNames: 'label',
            dataAttr: [['for', item.name]],
            children: item.name
          }),
          create({
            tagName: 'span',
            classNames: 'list__name',
            children: `(${item.count}/${item.baseCount})`
          })
        ]
      });

      checkBox.addEventListener('click', () => this.onFilterClick(item.name, checkBox.checked));
      return element;
    });

    const titleSubline = create({
      tagName: 'div',
      classNames: 'filters__item__title__subline'
    });

    const rangeInputPrice = create({
      tagName: 'div',
      children: `
        <input
         ${props?.minVal ? `data-value-min="${props.minVal}"` : ''}
         ${props?.maxVal ? `data-value-max="${props.maxVal}"` : ''}
          data-min="14"
          data-max="4180"
          data-role="doubleslider"
          class="input-range ultra-thin cycle-marker"
          id="priceDoubleSlider"
        />
      `
    });

    const rangeInputStock = create({
      tagName: 'div',
      children: `
      <input
       ${props?.maxStocks ? `data-value-min="${props.minStocks}"` : ''}
       ${props?.maxStocks ? `data-value-max="${props.maxStocks}"` : ''}
        data-min="7"
        data-max="200"
        data-role="doubleslider"
        class="input-range ultra-thin cycle-marker"
        id="stockDoubleSlider"
      />
    `
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
                              children: `${props?.minVal ? props.minVal : '14'} $`,
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
                              children: `${props?.maxVal ? props.maxVal : '4180'} $`,
                              dataAttr: [['id', 'max__range']]
                            })
                          ]
                        })
                      ]
                    }),
                    rangeInputPrice
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
                              children: `${props?.maxStocks ? props.minStocks : '2'}`,
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
                              children: `${props?.maxStocks ? props.maxStocks : '500'}`,
                              dataAttr: [['id', 'max__range2']]
                            })
                          ]
                        })
                      ]
                    }),
                    rangeInputStock
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
