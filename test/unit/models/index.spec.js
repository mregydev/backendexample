'use strict';

const expect=require('assert')

describe('models/index', function () {
  it('returns the bolletin model', function () {
    var models = require('../../../DAL/models');
    expect.ok(models.bulletin);
  });

  it('returns the comment model', function () {
    var models = require('../../../DAL/models');
    expect.ok(models.comment);
  });
});
