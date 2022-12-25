import { FilterPage } from "../components/FilterPage/FilterPage";
import { MainHTML } from "../components/MainHTML/MainHTML";
import { filter } from "../components/MainHTML/MainHTML";

export class Router {
  routes: object;
  _mainTag: HTMLElement | null;

  constructor (mainTag: HTMLElement | null) {
    this._mainTag = mainTag;
    this.routes = {
      "/": new MainHTML(this._mainTag),
      "/filter": new FilterPage(this._mainTag)
    };
  }

  // initRouter = (hash?: string) => {
  initRouter = () => {
    if (filter !== null) {
      filter.addEventListener('click', (event) => this.route(event));
    }

    window.addEventListener('popstate', () => {
      this.handleLocation();
    })
  
    // if (hash) this.handleLocation(hash)
    // else this.handleLocation();
    this.handleLocation();
  }
  
  route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();

    if (event.target instanceof HTMLAnchorElement) {
      window.history.pushState({}, '', event.target.href)
    }

    this.handleLocation();
  }
  
  // handleLocation = async (hash?: string) => {
  handleLocation = async () => {
    // let path = window.location.pathname;
    const path = window.location.pathname;
    // if (hash) path = hash;
    const route: FilterPage = this.routes[path as keyof typeof this.routes] || this.routes[404 as keyof typeof this.routes];
    const html = route.render();

    if (this._mainTag !== null) {
      this._mainTag.innerHTML = '';
      this._mainTag.appendChild(html);
    }
  };

  // enableRouteChange () {
  //   window.addEventListener('hashchange', () => {
  //     const hash = `/${window.location.hash.slice(1)}`;
  //     this.initRouter(hash);
  //   })
  // }
}