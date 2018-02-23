import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';

import {Link} from 'react-router-dom';
import Input from './Input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    const { email, password } = values;
    return this.props.dispatch(login(email, password));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/home" />;
    }

    let error;
    if (this.props.error) {
        error = (
          <div className="login-error" aria-live="polite">
            {this.props.error}
          </div>
        );
    }
    return (
      <div className="login-container">
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>

        {error}

        <fieldset className="login-box">
            <legend>Log In</legend>
            <div className='fields-container'>
              <label htmlFor="email"></label>
              <Field
                component={Input}
                type="text"
                name="email"
                id="email"
                placeholder="email"
                validate={[required, nonEmpty]}
              />
              <label htmlFor="password"></label>
              <Field
                component={Input}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                validate={[required, nonEmpty]}
              />
              <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                Login
              </button>

            </div>
          </fieldset>
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default LoginForm = connect(
  mapStateToProps)(reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm));