import { filter } from '../pages/PageMain/PageMain';
import { IPageProps } from '../types';

interface IRoutes {
  [key: string]: {
    mount: (props?: IPageProps) => void;
    unmount: () => void;

    mountedProps?: IPageProps;
  };
}

export class Router {
  routes: IRoutes;
  _mainTag: HTMLElement | null;
  activeRoute: string;

  constructor(mainTag: HTMLElement | null, routes: IRoutes) {
    this._mainTag = mainTag;
    this.routes = routes;
    this.activeRoute = '/';
  }

  initRouter = () => {
    if (filter !== null) {
      filter.addEventListener('click', (event) => this.route(event));
    }

    window.addEventListener('popstate', () => {
      this.handleLocation();
    });

    this.handleLocation();
  };

  route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();

    if (event.target instanceof HTMLAnchorElement) {
      window.history.pushState({}, '', event.target.href);
    }

    this.handleLocation();
  };

  handleLocation = async () => {
    let path = window.location.pathname;

    if (Object.prototype.hasOwnProperty.call(this.routes, path) === false) {
      path = '404';
    }

    const route = this.routes[path];

    this.routes[this.activeRoute].unmount();
    if (route?.mountedProps?.mounted) {
      route.mount({ mounted: route.mountedProps.mounted });
    } else {
      route.mount();
    }
    this.activeRoute = path;
  };
}
