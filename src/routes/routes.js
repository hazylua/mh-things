import * as pages from "../pages";

export const public_routes = [
  { path: "/", exact: true, component: pages.HomePage },
  { path: "/filter-table", component: pages.FilterTablePage },
  { path: "/set-searcher", component: pages.SetSearcherPage },
];
