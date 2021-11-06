const BASE_URL = require("../environment").url;
var chai = require("chai");
var expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

module.exports = { chai, expect, BASE_URL }