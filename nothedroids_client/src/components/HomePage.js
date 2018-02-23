import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleView } from '../actions/views';

export default class HomePage extends Component {
  render() {
    return(
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
};

