import { create } from '../../utils/create';

export class Footer {
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
    this.component = create({
      tagName: 'div',
      classNames: 'footer__wrapper',
      children: [
        create({
          tagName: 'section',
          classNames: 'footer__signature',
          children: [
            create({
              tagName: 'a',
              classNames: 'footer__link',
              dataAttr: [['href', 'https://github.com/AlyaKavalenka']],
              children: [
                create({
                  tagName: 'img',
                  classNames: 'footer__github-logo',
                  dataAttr: [
                    ['src', '/assets/icons/github.svg'],
                    ['alt', 'github']
                  ]
                }),
                create({
                  tagName: 'span',
                  classNames: 'footer__name',
                  children: `Alya Kavalenka`
                })
              ]
            }),
            create({
              tagName: 'a',
              classNames: 'footer__link',
              dataAttr: [['href', 'https://github.com/ulianasavi']],
              children: [
                create({
                  tagName: 'img',
                  classNames: 'footer__github-logo',
                  dataAttr: [
                    ['src', '/assets/icons/github.svg'],
                    ['alt', 'github']
                  ]
                }),
                create({
                  tagName: 'span',
                  classNames: 'footer__name',
                  children: `Uliana Savitskaya`
                })
              ]
            }),
            create({
              tagName: 'div',
              classNames: 'footer__date',
              children: 'December, 2022'
            })
          ]
        }),
        create({
          tagName: 'section',
          classNames: 'footer__course',
          children: [
            create({
              tagName: 'a',
              classNames: 'footer__link',
              dataAttr: [['href', 'https://rs.school/js/']],
              children: [
                create({
                  tagName: 'img',
                  classNames: 'footer__course-logo',
                  dataAttr: [
                    ['src', '/assets/icons/rsschool.svg'],
                    ['alt', 'course-logo']
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
