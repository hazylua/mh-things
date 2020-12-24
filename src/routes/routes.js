import * as pages from "../pages";

export const public_routes = [
  { path: "/", exact: true, component: pages.Home },
  { path: "/filter-table", component: pages.FilterTable },
  { path: "/set-searcher", component: pages.SetSearcher },
];
