import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleView } from '../actions/views';

import RegistrationForm from './RegistrationForm';

export class RegistrationPage extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('signup'));
  }

  render() {
    return(
      <RegistrationForm />
    )
  }
}

export default connect()(RegistrationPage);
