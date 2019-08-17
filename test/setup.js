require('dotenv').config(); //this gives access to all test / spec files to use the environmental variables inside .env
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;