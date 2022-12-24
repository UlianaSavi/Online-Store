import { FilterPage } from "../components/FilterPage/FilterPage";
import { MainHTML } from "../components/MainHTML/MainHTML";
import { filter } from "../components/MainHTML/MainHTML";

export class Router {
  routes: object;
  mainTag: HTMLElement | null;

  constructor () {
    this.mainTag = null;
    this.routes = {
      "/": new MainHTML(this.mainTag),
      "/filter": new FilterPage(this.mainTag)
    };

    // this.initRouter();
  }

  initRouter = (hash?: string) => {
    this.mainTag = document.getElementById('main');
    
    if (filter !== null) {
      filter.addEventListener('click', (event) => this.route(event));
    }

    window.addEventListener('popstate', () => {
      this.handleLocation();
    })
  
    if (hash) this.handleLocation(hash)
    else this.handleLocation();
  }
  
  route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();

    if (event.target instanceof HTMLAnchorElement) {
      window.history.pushState({}, '', event.target.href)
    }

    this.handleLocation();
  }
  
  handleLocation = async (hash?: string) => {
    let path = window.location.pathname;
    if (hash) path = hash;
    const route: FilterPage = this.routes[path as keyof typeof this.routes] || this.routes[404 as keyof typeof this.routes];
    const html = route.render();

    if (this.mainTag !== null) {
      this.mainTag.innerHTML = '';
      this.mainTag.appendChild(html);
    }
  };

  enableRouteChange () {
    window.addEventListener('hashchange', () => {
      const hash = `/${window.location.hash.slice(1)}`;
      this.initRouter(hash);
    })
  }
}