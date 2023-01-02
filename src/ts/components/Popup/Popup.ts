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
    // const cardNumber = document.createElement('input');
    // cardNumber.classList.add('input input__card-number');
    // cardNumber.type = 'number';
    // cardNumber.placeholder = 'Card number';

    // cardNumber?.addEventListener('keypress', () => {
    //   cardNumber.value = cardNumber.value.substring(0, 15);
    // });

    const cart2 = create({
      tagName: 'input',
      // dataAttr: [['href', '##']],
      classNames: 'input input__card-number'
    }) as HTMLInputElement;

    cart2?.addEventListener('keypress', () => {
      cart2.value = cart2.value.substring(0, 15);
    });

    // const payLogo = document.createElement('img');
    // payLogo.classList.add('credit-card__image');
    // payLogo.alt = 'pay logo';

    // // visa
    // payLogo.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
    // // master card
    // // payLogo.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';

    this.component = create({
      tagName: 'section',
      classNames: 'popup',
      dataAttr: [['id', 'popup']],
      children: [
        create({
          tagName: 'div',
          // dataAttr: [['href', '##']],
          classNames: 'popup__area'
        }),
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
                  // dataAttr: [['href', '#']],
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
                                  children: ['payLogo']
                                }),
                                cart2
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
                      dataAttr: [['href', '#']],
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
