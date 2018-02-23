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
      <div classsName="login">
        <div className="login-wrapper">
          <LoginForm />
        </div>
        <img className="background-img-nightsky" src="https://res.cloudinary.com/envato-sites/image/fetch/c_limit,w_1600/https://envato-sites-user-assets.s3-us-west-2.amazonaws.com/3e1b3c1e-9823-4076-9663-b4eb01e482fd" alt="starry night background"/>
      </div>
    )
  }
}

export default connect()(LoginPage);
