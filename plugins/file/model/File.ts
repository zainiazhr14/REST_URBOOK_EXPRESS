'use strict';

import sequelize from '../../../driver/database/postgresql/config';

const { DataTypes } = require('sequelize');

const tableName = 'files';
const modelName = 'File';

const File = sequelize.define(modelName, {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  file_type: {
    type: DataTypes.STRING
  },
  path: {
    type: DataTypes.STRING
  }
}, {
  tableName: tableName,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});


export default sequelize.models[modelName];
