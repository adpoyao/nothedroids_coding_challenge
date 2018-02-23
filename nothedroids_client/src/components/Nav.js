import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

export class Nav extends Component {

  handleChangeView = (selectedView) => {
    // VIEWS: (1)homepage, (2)login, (3)signup
    this.props.dispatch(actions.toggleView(selectedView));
  }
  
  logOut() {
    
  }

  render() {
    let menuItems;  

    if(this.props.currentView === 'signup'){
      menuItems = (
        <div className="nav-button right">
          <button><Link to="/signup">Signup</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      )
    }

    else if(this.props.currentView === 'login'){
      menuItems = (
        <div>
          <button><Link to="/signup">Signup</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      )
    }

    else if(this.props.currentView === 'homepage'){
      menuItems = (
        <div className>
          <button><Link to="/login">Logout</Link></button>
        </div>
      )
    }

    return(
      <div className="nav-bar">
        <img className="logo" src="https://res.cloudinary.com/envato-sites/image/fetch/c_limit,h_120/https://envato-sites-user-assets.s3-us-west-2.amazonaws.com/5d4c8dbd-3c12-4c18-b9f2-89caf1be7c97" alt="company logo"/>
        {menuItems}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentView: state.view.selectedView,
})

export default connect(mapStateToProps)(Nav)