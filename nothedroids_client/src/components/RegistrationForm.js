import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import {Link} from 'react-router-dom';

import Input from './Input';
import { login } from '../actions/auth';
import { registerUser } from '../actions/users';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { email, password, firstName, lastName } = values;
    const user = { email, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(email, password)));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/home" />;
    }

    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="signup sigup-success">
          Signed up successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="signup signup-error">{this.props.error}</div>
      );
    }

    return (
      <div>
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>

        {successMessage}
        {errorMessage}

        <fieldset className="registration-box">
          <legend>Sign Up</legend>
        <div className='fields-container-2'>
          <label htmlFor="firstName"></label>
          <Field component={Input} type="text" name="firstName" placeholder="first name"/>
          <label htmlFor="lastName"></label>
          <Field component={Input} type="text" name="lastName" placeholder="last name"/>
          <label htmlFor="email"></label>
          <Field
            component={Input}
            type="text"
            name="email"
            placeholder="email"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <label htmlFor="password"></label>
          <Field
            component={Input}
            type="password"
            name="password"
            placeholder="password"
            validate={[required, length({min: 6, max: 72}), isTrimmed]}
          />
          <label htmlFor="passwordConfirm"></label>
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            placeholder="confirm password"
            validate={[required, nonEmpty, matches('password')]}
          />
          <button
              className="sign"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Sign Up
          </button>
        </div>
        </fieldset>
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
})

RegistrationForm = connect(mapStateToProps)(RegistrationForm);

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
