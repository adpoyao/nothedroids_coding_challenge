'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { User } = require('./models');

// POST: Registering New User
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['email', 'password', 'firstName', 'lastName'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['email', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // Ensure email and password aren't trimmed
  const explicityTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );
  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
  const sizedFields = {
    email: {
      min: 1
    },
    password: {
      // bcrypt truncates after 72 characters, so max is 72
      min: 6,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );
  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
  let { email, password, firstName = '', lastName = '' } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();
  return User.find({email})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same email
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email already taken',
          location: 'email'
        });
      }
      // If there is no existing user with the same email, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        email,
        password: hash,
        firstName,
        lastName,
      });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      
      // Forward validation errors on to the client; otherwise 
      // Give a 500 error 
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      console.error(err)
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// TODO: For Development ONLY. Mute/Delete upon Production.
router.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};