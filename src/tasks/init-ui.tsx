
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "../pages/LoginPage";
import "antd/dist/antd.css"
import PrivateRoute from "../utils/PrivateRoute";
import Home from "../pages/Home";
import WPage from "../pages/WPage/w-page";
const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Switch>

        {/* <Route exact component={Login} path='/login'></Route> */}
        <Route exact component={Login} path='/login'></Route>
        <Route exact component={Login} path='/'></Route>
        {/* <Route exact component={Nav} path='/nav'></Route> */}
        <PrivateRoute component={Home} path='/home'></PrivateRoute>
        <PrivateRoute component={WPage} path='/myroom'></PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

function getPopupContainer(trigger?: HTMLElement): HTMLElement {
  return trigger?.parentElement || document.body;
}

export const initUI = (): void => {
  ReactDOM.render(<App />, document.getElementById("app"));
};