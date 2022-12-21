import { Model } from '../models/model';

export class PageController {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  changePage = (pageId = '') => {
    const page = this.model.getState().page;
    if (!page) {
      return;
    }

    page.currentPage = pageId;
    this.model.setState({
      ...this.model.getState(),
      page
    });
  };
}
