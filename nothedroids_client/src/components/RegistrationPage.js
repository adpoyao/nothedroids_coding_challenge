import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleView } from '../actions/views';

import RegistrationForm from './RegistrationForm';
import './RegistrationPage.css';

export class RegistrationPage extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('signup'));
  }

  render() {
    return(
      <div className="register">
        <div className="register-wrapper">
          <RegistrationForm />
        </div>
        <img className="background-img-nightsky" src="https://res.cloudinary.com/envato-sites/image/fetch/c_limit,w_1600/https://envato-sites-user-assets.s3-us-west-2.amazonaws.com/3e1b3c1e-9823-4076-9663-b4eb01e482fd" alt="starry night background"/>
      </div>
    )
  }
}

export default connect()(RegistrationPage);
