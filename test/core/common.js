const BASE_URL = require("../environment").url;
var chai = require("chai");
var expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

function wait(done, time) {
   setTimeout(() => done(), time)
};

module.exports = { chai, expect, BASE_URL, wait }