'use strict';

import User from './User';

module.exports = async function() {
  //FIXME: remove force=true when table is stable
  if (process.env.NODE_ENV !== 'local') return;

  await User.sync({
    force: (process.env.NODE_ENV === 'local')
  });


  await User.create({
    'id': '1517ed52-dc6e-4b9e-84f1-f46fdfbeca20',
    'is_active':true,
    'username':'admin',
    'full_name': 'admin',
    'password':'123456',
    'role': 'admin',
    'created_at':'2020-03-15T11:22:04.264Z',
    'updated_at':'2020-03-16T03:57:08.579Z',
  });

  await User.create({
    'id': '1517ed52-dc6e-4b9e-84f1-f46fdfbeca21',
    'is_active':true,
    'username':'visitor',
    'full_name': 'visitor',    
    'password':'123456',
    'role': 'visitor',
    'created_at':'2020-03-15T11:22:04.264Z',
    'updated_at':'2020-03-16T03:57:08.579Z',
  });
};