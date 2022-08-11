'use strict';

import File from './File';

module.exports = async function() {
  //FIXME: remove force=true when table is stable
  if (process.env.NODE_ENV !== 'local') return;

  await File.sync({
    force: (process.env.NODE_ENV === 'local')
  });


};