import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleView } from '../actions/views';

import './HomePage.css';

export class HomePage extends Component {
  render() {
    let currentUser = this.props.currentUser;
    return(
      <div className="details">
        <div className="details-container">
          <div className="details-wrap">
            <h2 className="heading-1">Oh hi.</h2>
            <h2 className="heading-2">You must be {currentUser.firstName}.</h2>
            <h3>Full name {currentUser.firstName} {currentUser.lastName} to be exact. Your email contact is {this.props.currentUser.email}.</h3>
          </div>
          <img className="background-img-laptop" src="https://dktovmf07nr2a.cloudfront.net/theme_assets/F11CB864-C7C3-4540-B0F7-AEC827E4E360/assets/images/apple-cinema-display-26fd7187fa.jpg" alt="laptop background"></img>
        </div>
        <div className="contact">
          <div className="contact-container">
            <h3>Let me know how I did! :)</h3>
            <h3>Created by: Eddie Po Yao</h3>
            <button><a href="mailto:contact@eddiepo.co">Contact</a></button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
})

export default connect(mapStateToProps)(HomePage)