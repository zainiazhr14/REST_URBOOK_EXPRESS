'use strict';

import sequelize from '../../../driver/database/postgresql/config';
import Book from '../../book/model/Book';
import User from '../../user/model/User';

const { DataTypes } = require('sequelize');

const tableName = 'favorites';
const modelName = 'Favorite';

const Favorite = sequelize.define(modelName, {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    type: DataTypes.UUID
  },
  book_id: {
    type: DataTypes.UUID
  }
}, {
  tableName: tableName,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});


Book.hasMany(Favorite, {
  foreignKey: 'book_id'
});

Favorite.belongsTo(Book, {
  foreignKey: 'book_id'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});


export default sequelize.models[modelName];
