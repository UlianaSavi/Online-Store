import { Details } from '../../components/Details/Details';
import { Header } from '../../components/Header/Header';
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
  header: Header;

  constructor(
    parent: HTMLElement | null,
    model: Model,
    controller: Controller,
    go: (event: Event) => void,
    header: Header
  ) {
    this.parent = parent;
    this.section = null;
    this.model = model;
    this.go = go;
    this.controller = controller;
    this.header = header;
  }

  createDefaultLayer = () => {
    this.section = create({
      tagName: 'section',
      classNames: 'details',
      parent: this.parent
    });
  };

  unmount = () => {
    this.section?.remove();
  };

  mount = (props?: IPageProps) => {
    if (this.header.searchWrapper !== null) {
      this.header.searchWrapper.style.visibility = 'hidden';
    }
    this.createDefaultLayer();

    const state = this.model.getState();
    const product = state.products.find((item) => item.id === props?.params?.productId);

    const details = new Details(this.section, this.go, this.controller, this.header);

    if (product) {
      details.update({ item: product });
    }

    this.model.subscribe((state, prevState) => {
      if (isEqual(state.products, prevState?.products)) {
        return;
      }
      const items = [...new Set(state.products.map((item) => item).filter((item) => !!item))];

      details.update({
        item: items.find((item) => item.id === props?.params?.productId) || items[0]
      });
    });

    props?.mounted && props?.mounted();
  };
}
