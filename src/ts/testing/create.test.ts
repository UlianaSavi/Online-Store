import { Model } from '../models/model';

describe('create: ', () => {
  const model = new Model({
    products: [],
    currProductID: 0,
    productsToShow: [],
    namesToShow: [],
    categoryFilters: [],
    nameFilters: [],
    sort: 'string',
    search: 'string',
    view: 'string',
    cartProducts: []
  });
  expect(model.getState);
});
