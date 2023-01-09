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

  route = (event: Event, func?: () => void) => {
    event = event || window.event;
    event.preventDefault();

    const target = event.target as HTMLElement | null;
    const link = target?.closest('a');

    if (link) {
      window.history.pushState({}, '', link.href);
    }

    if (func) {
      this.handleLocation().then(func);
    } else {
      this.handleLocation();
    }
  };

  handleLocation = async () => {
    let path = window.location.pathname;
    let route = this.routes[path];

    const [rootPath, id = null] = path.split('/').filter((item) => !!item);

    if (
      !Object.prototype.hasOwnProperty.call(this.routes, path) &&
      !this.routes[`/${rootPath}/:id`]
    ) {
      path = '404';
    }
    if (this.routes[`/${rootPath}/:id`]) {
      route = this.routes[`/${rootPath}/:id`];
      path = `/${rootPath}/:id`;
    }

    this.routes[this.activeRoute].unmount();

    if (route?.mountedProps?.mounted) {
      const props: IPageProps = {
        mounted: route.mountedProps.mounted
      };

      if (id) {
        props.params = {
          productId: +id
        };
      }
      route.mount(props);
    } else {
      route = this.routes[path];
      route.mount();
    }

    this.activeRoute = path;
  };
}
