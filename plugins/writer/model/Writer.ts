'use strict';

import sequelize from '../../../driver/database/postgresql/config';
import Book from '../../book/model/Book';


const { DataTypes } = require('sequelize');

const tableName = 'writers';
const modelName = 'Writer';

const Writer = sequelize.define(modelName, {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  full_name: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    default: 'male'
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
    beforeDestroy: async function(instance: any) {
      await Book.destroy({where: { writer_id: instance.id }});
    }
  }
});



export default sequelize.models[modelName];
