import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Nav from './components/Nav';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import HomePage from './components/HomePage';

import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegistrationPage} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));