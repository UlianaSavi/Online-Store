import { IPageProps } from '../types';

interface IRoutes {
  [key: string]: {
    mount: (props?: IPageProps) => void;
    unmount: () => void;

    mountedProps?: IPageProps;
  };
}

export class Router {
  routes: IRoutes = {};
  _mainTag: HTMLElement | null;
  activeRoute: string;

  constructor(mainTag: HTMLElement | null) {
    this._mainTag = mainTag;
    this.activeRoute = '/';
  }

  initRouter = (routes: IRoutes) => {
    this.routes = routes;

    window.addEventListener('popstate', () => {
      this.handleLocation();
    });

    this.handleLocation();
  };

  route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();

    const target = event.target as HTMLElement | null;
    const link = target?.closest('a');

    if (link) {
      window.history.pushState({}, '', link.href);
    }

    this.handleLocation();
  };

  handleLocation = async () => {
    let path = window.location.pathname;

    // const [rootPath, id = null] = path.split('/').filter((item) => !!item);
    // if (this.routes[`/${rootPath}/:id`]) {
    //   path = `${rootPath}/${id}`;
    // }

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
