import React from "react";
import { Routes, Route } from "react-router-dom";
import DASHBOARD from "../pages/dashboard";


import { ROOT, Dashboard } from "./constants";
// import { dark, light } from "../styles/muiTheme";

export const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route exact path={ROOT} element={<DASHBOARD/>} />
        <Route exact path={Dashboard} element={<DASHBOARD/>} />
      </Routes>
    </div>
  );
};
