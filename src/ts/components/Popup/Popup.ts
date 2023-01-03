import { create } from '../../utils/create';

export class Popup {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  unmount = () => {
    this.component?.remove();
  };

  mount = () => {
    const cardNumber = create({
      tagName: 'input',
      dataAttr: [
        ['type', 'number'],
        ['placeholder', 'Card number']
      ],
      classNames: 'input input__card-number'
    }) as HTMLInputElement;

    cardNumber?.addEventListener('keypress', () => {
      cardNumber.value = cardNumber.value.substring(0, 15);
    });

    const payLogo = create({
      tagName: 'img',
      classNames: 'credit-card__image',
      dataAttr: [['alt', 'pay logo']]
    }) as HTMLImageElement;

    // visa
    payLogo.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
    // master card
    // payLogo.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';

    this.component = create({
      tagName: 'section',
      classNames: 'popup',
      dataAttr: [['id', 'popup']],
      children: [
        create({
          tagName: 'div',
          classNames: 'popup__body',
          children: [
            create({
              tagName: 'div',
              classNames: 'popup__content',
              children: [
                create({
                  tagName: 'div',
                  classNames: 'cross close-popup',
                  children: [`x`]
                }),
                create({
                  tagName: 'div',
                  classNames: 'popup__block',
                  children: [
                    create({
                      tagName: 'h4',
                      classNames: 'popup__h4',
                      children: [`Personal details`]
                    }),
                    create({
                      tagName: 'div',
                      classNames: 'input-container',
                      children: [
                        create({
                          tagName: 'input',
                          classNames: 'input input__name',
                          dataAttr: [
                            ['placeholder', 'Name and Surname'],
                            ['type', 'text']
                          ]
                        }),
                        create({
                          tagName: 'input',
                          classNames: 'input input__phone',
                          dataAttr: [
                            ['placeholder', 'Phone number'],
                            ['type', 'tel'],
                            ['value', '+'],
                            ['minlength', '10']
                          ]
                        }),
                        create({
                          tagName: 'input',
                          classNames: 'input input__address',
                          dataAttr: [
                            ['placeholder', 'Delivery address'],
                            ['type', 'text']
                          ]
                        }),
                        create({
                          tagName: 'input',
                          classNames: 'input input__email',
                          dataAttr: [
                            ['placeholder', 'E-mail'],
                            ['type', 'email']
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'h4',
                      classNames: 'popup__h4',
                      children: [`Credit card details`]
                    }),
                    create({
                      tagName: 'div',
                      classNames: 'credit-card-container',
                      children: [
                        create({
                          tagName: 'div',
                          classNames: 'credit-card',
                          children: [
                            create({
                              tagName: 'div',
                              classNames: 'credit-card__image-n-input',
                              children: [
                                create({
                                  tagName: 'div',
                                  classNames: 'credit-card__image-wrapper',
                                  children: [payLogo]
                                }),
                                cardNumber
                              ]
                            }),
                            create({
                              tagName: 'div',
                              classNames: 'credit-card__date-n-cvv',
                              children: [
                                create({
                                  tagName: 'div',
                                  classNames: 'credit-card__text-n-input',
                                  children: [
                                    create({
                                      tagName: 'span',
                                      classNames: 'credit-card__text',
                                      children: 'Expiration date'
                                    }),
                                    create({
                                      tagName: 'input',
                                      classNames: 'input input__date',
                                      dataAttr: [
                                        ['type', 'text'],
                                        ['placeholder', '12/23']
                                      ]
                                    })
                                  ]
                                }),
                                create({
                                  tagName: 'div',
                                  classNames: 'credit-card__text-n-input',
                                  children: [
                                    create({
                                      tagName: 'span',
                                      classNames: 'credit-card__text',
                                      children: 'CVV'
                                    }),
                                    create({
                                      tagName: 'input',
                                      classNames: 'input input__cvv',
                                      dataAttr: [
                                        ['type', 'text'],
                                        ['placeholder', '132']
                                      ]
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    create({
                      tagName: 'a',
                      classNames: 'popup__confirm close-popup',
                      children: [`Confirm`]
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
