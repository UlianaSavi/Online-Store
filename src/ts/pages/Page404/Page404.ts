import { create } from '../../utils/create';

export class Page404 {
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
      classNames: 'main__wrapper',
      children: [
        create({
          tagName: 'div',
          classNames: 'page404',
          children: [
            create({
              tagName: 'section',
              classNames: 'text',
              children: [
                create({
                  tagName: 'h1',
                  classNames: 'text__h1',
                  children: 'Hide & Seek Time!'
                }),
                create({
                  tagName: 'h4',
                  classNames: 'text__h4',
                  children: `And you're it!<br>(Sorry, we can't find the page, too.)`
                }),
                create({
                  tagName: 'a',
                  classNames: 'text__link-to-main',
                  dataAttr: [['href', '/']],
                  children: 'Go back home'
                })
              ]
            }),
            create({
              tagName: 'section',
              classNames: 'page404__image-wrapper',
              children: [
                create({
                  tagName: 'img',
                  classNames: 'page404__image',
                  dataAttr: [
                    ['src', '../../../assets/img/for-page404-removebg-preview.png'],
                    ['alt', 'image for page not found']
                  ]
                })
              ]
            })
          ]
        })
      ],
      parent: this.parent
    })
    return this.component;
  }
}