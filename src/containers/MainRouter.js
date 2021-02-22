import React, {Component} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';


import DashboardPage from './pages/DashboardPage';
import ClientPage from './pages/ClientPage';
import ClientChatPage from './pages/ClientChatPage';
import ClientFormPage from "./pages/ClientFormPage";
import ClientCallPage from "./pages/ClientCallPage";
import IndexPage from './pages/IndexPage';


class MainRouter extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/client"} component={ClientPage} />
          <Route exact path={"/client/chat"} component={ClientChatPage} />
          <Route exact path={"/client/form"} component={ClientFormPage} />
          <Route exact path={"/client/call"} component={ClientCallPage} />
          <Route exact path={"/dashboard"} component={DashboardPage} />
          <Route path={"/"} component={IndexPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default MainRouter;
