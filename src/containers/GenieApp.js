import React, { Component } from 'react';
import MainRouter from './MainRouter';

import CssBaseline from '@material-ui/core/CssBaseline';
import '../styling/style.scss';

class GenieApp extends Component {

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MainRouter />
      </React.Fragment>
    );
  }

}

export default GenieApp;
