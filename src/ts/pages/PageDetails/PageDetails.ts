import { Details } from '../../components/Details/Details';
import { Controller } from '../../controllers/controller';
import { Model } from '../../models/model';
import { IPageProps } from '../../types';
import { create } from '../../utils/create';
import { isEqual } from '../../utils/objects';

export class PageDetails {
  parent: HTMLElement | null;
  section: HTMLElement | null;
  model: Model;
  controller: Controller;
  go: (event: Event) => void;

  constructor(
    parent: HTMLElement | null,
    model: Model,
    controller: Controller,
    go: (event: Event) => void
  ) {
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.go = go;
    this.controller = controller;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'details container',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    this.createDefaultLayer();

    const state = this.model.getState();
    const product = state.products.at(0);

    const details = new Details(this.section, this.go);

    if (product) {
      details.update({ item: product });
    }

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];
      details.update({ item: items[0] });
    });

    props?.mounted && props?.mounted();
  };
}
