'use strict';
module.exports = (sequelize, DataTypes) => {
  var bulletin = sequelize.define('bulletin', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    logourl: DataTypes.STRING
  });



  bulletin.associate = function(models) {
    models.bulletin.hasMany(models.comment);
  };
  return bulletin;
};
