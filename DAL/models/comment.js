'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    user:DataTypes.STRING,
    
  });

  comment.associate = function(models) {
    models.comment.belongsTo(models.bulletin, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return comment;
};
