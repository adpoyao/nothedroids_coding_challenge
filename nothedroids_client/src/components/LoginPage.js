import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleView } from '../actions/views';

import LoginForm from './LoginForm';

export class LoginPage extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('login'));
  }

  render() {
    return(
      <LoginForm />
    )
  }
}

export default connect()(LoginPage);
