import { FilterPage } from "../components/FilterPage/FilterPage";
import { MainHTML } from "../components/MainHTML/MainHTML";

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

  initRouter = () => {
    this.mainTag = document.getElementById('main');
    const filter = document.getElementById('filter');
    console.log(typeof filter)
    
    if (filter !== null) {
      console.log('adding event listener')
      filter.addEventListener('click', (event) => this.route(event));
    }
    window.onpopstate = this.handleLocation;
  
    this.handleLocation();
  }
  
  route = (event: Event) => {
    console.log('handling route')
    event = event || window.event;
    event.preventDefault();

    if (event.target instanceof HTMLAnchorElement) {
      window.history.pushState({}, '', event.target.href)
    }

    this.handleLocation();
  }
  
  handleLocation = async () => {
    console.log('handing location')
    const path = window.location.pathname;
    const route: FilterPage = this.routes[path as keyof typeof this.routes] || this.routes[404 as keyof typeof this.routes];
    const html = route.render();
    console.log(route)

    if (this.mainTag !== null) {
      this.mainTag.innerHTML = '';
      this.mainTag.appendChild(html);
    }
  };
}