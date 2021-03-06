'use strict';

require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://dev:dev@ds147228.mlab.com:47228/nothedroids',
  JWT_SECRET: process.env.JWT_SECRET || 'hireeddie',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};