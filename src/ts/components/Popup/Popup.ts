import { create } from '../../utils/create';
import { Controller } from '../../controllers/controller';

export class Popup {
  parent: HTMLElement | null;
  component: HTMLElement | null;
  popupContent: HTMLElement | null;
  controller: Controller;

  constructor(parent: HTMLElement | null, controller: Controller) {
    this.parent = parent;
    this.component = null;
    this.popupContent = null;
    this.controller = controller;
  }

  unmount = () => {
    this.component?.remove();
  };

  mount = () => {
    // open/close popup
    const closePopupButtonX = create({
      tagName: 'div',
      classNames: 'cross close-popup',
      children: [`x`]
    })

    closePopupButtonX.addEventListener('click', this.controller.closePopup);

    const closePopupButtonConfirm = create({
      tagName: 'a',
      classNames: 'popup__confirm close-popup',
      children: [`Confirm`]
    })

    closePopupButtonConfirm.addEventListener('click', this.controller.closePopup);

    // input validation
    const inputName = create({
      tagName: 'input',
      classNames: 'input input__name',
      dataAttr: [
        ['placeholder', 'Name and Surname'],
        ['type', 'text']
      ]
    }) as HTMLInputElement;
    inputName.title = 'Must contain at least two words, each at least 3 characters long';
    inputName.pattern = '[A-Za-z]{3,}\\b.+?[A-Za-z]{3,}';

    const inputPhone = create({
      tagName: 'input',
      classNames: 'input input__phone',
      dataAttr: [
        ['placeholder', 'Phone number'],
        ['type', 'tel']
      ]
    }) as HTMLInputElement;
    inputPhone.title = 'Must start with '+', contain only digits and be no shorter than 9 digits';
    inputPhone.pattern = '[+][0-9]{9,}';
    inputPhone.addEventListener('click', () => {
      if (inputPhone.value === '') inputPhone.value = '+';
    })

    const cardNumber = create({
      tagName: 'input',
      dataAttr: [
        ['type', 'number'],
        ['placeholder', 'Card number'],
        ['required']
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

    // create elements
    this.popupContent = create({
      tagName: 'div',
      classNames: 'popup__content',
      children: [ 
        closePopupButtonX,
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
                inputName,
                inputPhone,
                create({
                  tagName: 'input',
                  classNames: 'input input__address',
                  dataAttr: [
                    ['placeholder', 'Delivery address'],
                    ['type', 'text'],
                    ['required']
                  ]
                }),
                create({
                  tagName: 'input',
                  classNames: 'input input__email',
                  dataAttr: [
                    ['placeholder', 'E-mail'],
                    ['type', 'email'],
                    ['required']
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
                                ['placeholder', '12/23'],
                                ['required']
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
                                ['placeholder', '132'],
                                ['required']
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
            closePopupButtonConfirm
          ]
        })
      ]
    })

    const popupBody = create({
      tagName: 'div',
      classNames: 'popup__body',
      children: [this.popupContent]
    })

    const popup = create({
      tagName: 'section',
      classNames: 'popup',
      dataAttr: [['id', 'popup']],
      children: [popupBody],
      parent: this.parent
    });
    
    this.component = popup;

    // close popup
    document.addEventListener('click', (e) => {
      if(e.target === popup || e.target === popupBody) {
        this.controller.closePopup();
      }
    });
  };
}
