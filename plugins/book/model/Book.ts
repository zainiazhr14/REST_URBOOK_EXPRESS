'use strict';

import sequelize from '../../../driver/database/postgresql/config';
import Writer from '../../writer/model/Writer'

const { DataTypes } = require('sequelize');

const tableName = 'books';
const modelName = 'Book';

const Book = sequelize.define(modelName, {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
  },
  writer_id: {
    type: DataTypes.UUID,
  },
  cover: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  total_page: {
    type: DataTypes.INTEGER
  },
  rate: {
    type: DataTypes.DOUBLE
  },
  genre: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
}, {
  tableName: tableName,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

Writer.hasMany(Book, {
  foreignKey: 'writer_id'
});

Book.belongsTo(Writer, {
  foreignKey: 'writer_id'
});

export default sequelize.models[modelName];
