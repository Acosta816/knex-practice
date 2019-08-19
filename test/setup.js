// need to make sure the environmental variables are loaded when we run tests
//this gives access to all test / spec files to use the environmental variables inside .env
require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;