import React from "react";
import { public_routes } from "./routes";
import { Switch, Route } from "react-router-dom";

const RouteConfig = () => {
  return (
    <>
      <Switch>
        {public_routes.map((route, idx) => {
          return <Route key={idx} {...route} />;
        })}
      </Switch>
    </>
  );
};

export default RouteConfig;
