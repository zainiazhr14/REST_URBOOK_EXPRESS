'use strict';

import sequelize from '../../../driver/database/postgresql/config';

const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const tableName = 'users';
const modelName = 'User';

const User = sequelize.define(modelName, {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'visitor'],
    default: 'visitor'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  profile: {
    type: DataTypes.STRING
  }
}, {
  tableName: tableName,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  hooks: {
    beforeSave: function(instance: any) {
      if (instance.changed('password')) {
        const salt = bcrypt.genSaltSync(10);
        instance.password = bcrypt.hashSync(instance.password, salt);
      }
    }
  }
});


User.prototype.comparePassword = function(candidatePassword: any) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  values.type = 'user';


  delete values.password;
  return values;
};

export default sequelize.models[modelName];
