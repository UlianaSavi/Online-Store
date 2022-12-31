import { create } from '../../utils/create';

export class Total {
  parent: HTMLElement | null;
  component: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.component = null;
  }

  update = () => {
    this.render();
  };
  
  render = () => {
    this.component?.remove();
    
    const buyBtn = create({
      tagName: 'button',
      classNames: 'btn',
      children: 'BUY NOW'
    });
    
    const popupBg = document.querySelector('.popup'); // Фон попап окна
    // const popup = document.querySelector('popup__content'); // Само окно

    buyBtn.addEventListener('click', (e) => {
      console.log('click');
      e.preventDefault(); // Предотвращаем дефолтное поведение браузера
      popupBg?.classList.add('active'); // Добавляем класс 'active' для фона
      // popup?.classList.add('active'); // И для самого окна
    })

    this.component = create({
      tagName: 'div',
      classNames: 'total',
      children: [
        create({
          tagName: 'h3',
          classNames: 'total__title h3',
          children: 'Summary'
        }),
        create({
          tagName: 'div',
          classNames: 'total__info',
          children: [
            create({
              tagName: 'div',
              classNames: 'total__info__count',
              children: [
                `Products: `,
                create({
                  tagName: 'i',
                  children: '10'
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'total__info__num',
              children: [
                `Total: `,
                create({
                  tagName: 'i',
                  children: '1000$'
                })
              ]
            }),
            create({
              tagName: 'div',
              children: `<input class="total__info__promo-code promo-input input" type="search" name="search-promo" id="" placeholder="Enter promo code">`
            }),
            create({
              tagName: 'div',
              classNames: 'total__info__promo-code-hint',
              children: [
                `Promo for test: `,
                create({
                  tagName: 'i',
                  children: [`"SHIT", "SHIT2"`]
                })
              ]
            }),
            buyBtn
          ]
        })
      ],
      parent: this.parent
    });
  };
}
