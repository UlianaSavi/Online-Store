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
    // input validation
    const inputName = create({
      tagName: 'input',
      classNames: 'input input__name',
      dataAttr: [
        ['placeholder', 'Name and Surname'],
        ['type', 'text']
      ]
    }) as HTMLInputElement;
    inputName.required = true;
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
    inputPhone.required = true;
    inputPhone.title = `Must start with '+', contain only digits and be no shorter than 9 digits`;
    inputPhone.pattern = '[+][0-9]{9,}';
    inputPhone.addEventListener('click', () => {
      if (inputPhone.value === '') inputPhone.value = '+';
    });

    const inputAddress = create({
      tagName: 'input',
      classNames: 'input input__address',
      dataAttr: [
        ['placeholder', 'Delivery address'],
        ['type', 'text']
      ]
    }) as HTMLInputElement;
    inputAddress.required = true;
    inputAddress.title = 'Must contain at least three words, each at least 5 characters long';
    inputAddress.pattern = '[A-Za-z]{5,}\\b.+?[A-Za-z]{5,}\\b.+?[A-Za-z]{5,}';

    const inputEmail = create({
      tagName: 'input',
      classNames: 'input input__email',
      dataAttr: [
        ['placeholder', 'E-mail'],
        ['type', 'email']
      ]
    }) as HTMLInputElement;
    inputEmail.required = true;
    inputEmail.title = 'Please enter the correct email address';
    inputEmail.pattern = '^[A-Za-z0-9]*[@][A-Za-z0-9]*[.][A-Za-z]*';

    const cardNumber = create({
      tagName: 'input',
      dataAttr: [['type', 'number'], ['placeholder', 'Card number'], ['required']],
      classNames: 'input input__card-number'
    }) as HTMLInputElement;
    cardNumber.required = true;

    const payLogo = create({
      tagName: 'img',
      classNames: 'credit-card__image',
      dataAttr: [['alt', 'pay logo']]
    }) as HTMLImageElement;
    payLogo.src = 'assets/icons/credit-card-regular.svg';
    cardNumber?.addEventListener('input', () => {
      if (cardNumber.value[0] !== undefined) {
        if (cardNumber.value[0].toString() === '4') {
          payLogo.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
        } else if (cardNumber.value[0].toString() === '5') {
          payLogo.src =
            'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
        } else if (cardNumber.value[0].toString() === '3') {
          payLogo.src = 'assets/icons/pngwing.com.png';
        }
      } else {
        payLogo.src = 'assets/icons/credit-card-regular.svg';
      }
      cardNumber.value = cardNumber.value.substring(0, 15);
    });

    const inputDate = create({
      tagName: 'input',
      classNames: 'input input__date',
      dataAttr: [
        ['type', 'text'],
        ['placeholder', '04/23']
      ]
    }) as HTMLInputElement;
    inputDate.required = true;
    inputDate.pattern = '(([0][1-9]|[1][0-2])/([2-9][0-9]))';
    inputDate.addEventListener('keyup', (event) => {
      if (event.code !== 'Backspace') {
        if (
          (event.which >= 48 && event.which <= 57) ||
          (event.which >= 96 && event.which <= 105) ||
          event.code === 'Slash' ||
          event.code === 'NumpadDivide'
        ) {
          if (inputDate.value.indexOf('/') === -1 && inputDate.value.length > 1) {
            const arr: string[] = [];
            inputDate.value.split('').map((item) => arr.push(item));
            arr.splice(2, 0, '/');
            inputDate.value = arr.join('');
          }
        } else {
          inputDate.value = '';
        }
      }
    });

    const inputCVV = create({
      tagName: 'input',
      classNames: 'input input__cvv',
      dataAttr: [
        ['type', 'number'],
        ['placeholder', '132']
      ]
    }) as HTMLInputElement;
    inputCVV.required = true;
    inputCVV.pattern = '[0-9]*';
    inputCVV.addEventListener('input', () => {
      inputCVV.value = inputCVV.value.substring(0, 3);
    });

    // create elements
    const closePopupButtonX = create({
      tagName: 'div',
      classNames: 'cross',
      children: [`x`]
    });

    const btnConfirm = create({
      tagName: 'button',
      classNames: 'popup__confirm',
      children: [`Confirm`],
      dataAttr: [['type', 'submit']]
    });

    const popupForm = create({
      tagName: 'form',
      classNames: 'popup__form',
      children: [
        create({
          tagName: 'h4',
          classNames: 'popup__h4',
          children: [`Personal details`]
        }),
        create({
          tagName: 'div',
          classNames: 'input-container',
          children: [inputName, inputPhone, inputAddress, inputEmail]
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
                        inputDate
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
                        inputCVV
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        btnConfirm
      ]
    }) as HTMLFormElement;

    this.popupContent = create({
      tagName: 'div',
      classNames: 'popup__content',
      children: [popupForm]
    });

    const popupBody = create({
      tagName: 'div',
      classNames: 'popup__body',
      children: [this.popupContent]
    });

    const popup = create({
      tagName: 'section',
      classNames: 'popup',
      dataAttr: [['id', 'popup']],
      children: [popupBody],
      parent: this.parent
    });

    this.component = popup;

    // open/close popup
    closePopupButtonX.addEventListener('click', this.controller.closePopup);
    setTimeout(() => {
      popupBody.appendChild(closePopupButtonX);
    }, 1500);

    document.addEventListener('click', (e) => {
      if (e.target === popup || e.target === popupBody) {
        this.controller.closePopup();
      }
    });

    // confirm popup
    popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.controller.confirmPopup(popupForm, closePopupButtonX);
    });
  };
}
