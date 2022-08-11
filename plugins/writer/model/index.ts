'use strict';

import Writer from './Writer';

module.exports = async function() {
  //FIXME: remove force=true when table is stable
  if (process.env.NODE_ENV !== 'local') return;

  await Writer.sync({
    force: (process.env.NODE_ENV === 'local')
  });

};