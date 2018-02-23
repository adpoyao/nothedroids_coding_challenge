import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import {clearAuthToken} from '../local-storage';

import './Nav.css';

export class Nav extends Component {

  handleChangeView = (selectedView) => {
    // VIEWS: (1)homepage, (2)login, (3)signup
    this.props.dispatch(actions.toggleView(selectedView));
  }
  
  logOut() {
    this.props.dispatch(actions.clearAuth());
    clearAuthToken();
  }

  render() {
    let menuItems;  

    if(this.props.currentView === 'signup'){
      menuItems = (
        <div className="menu-items">
          <Link to="/signup" className="menu-button underline">Signup</Link>
          <Link to="/login" className="menu-button">Login</Link>
        </div>
      )
    }

    else if(this.props.currentView === 'login'){
      menuItems = (
        <div className="menu-items">
          <Link to="/signup" className="menu-button">Signup</Link>
          <Link to="/login" className="menu-button underline">Login</Link>
        </div>
      )
    }

    else if(this.props.currentView === 'homepage'){
      menuItems = (
        <div className="menu-items">
          <Link to="/login" className="menu-button logout" onClick={() => this.logOut()}>Logout</Link>
        </div>
      )
    }

    return(
      <div className="nav-bar">
        <div className="wrap">
          <a href="http://www.nothedroids.com/"><img className="logo" src="https://res.cloudinary.com/envato-sites/image/fetch/c_limit,h_120/https://envato-sites-user-assets.s3-us-west-2.amazonaws.com/5d4c8dbd-3c12-4c18-b9f2-89caf1be7c97" alt="company logo"/></a>
          {menuItems}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentView: state.view.selectedView,
})

export default connect(mapStateToProps)(Nav)