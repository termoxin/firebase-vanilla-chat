const routes = {};

function page404(html = "404") {
  root.innerHTML = html;
}

export function route(path, handler) {
  routes[path] = handler;
}

export function initRoutes() {
  const pathname = window.location.pathname;

  if (routes.hasOwnProperty(pathname)) {
    routes[pathname]();
  } else {
    page404();
  }
}
