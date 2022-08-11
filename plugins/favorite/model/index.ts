'use strict';

import Favorite from './Favorite';

module.exports = async function() {
  //FIXME: remove force=true when table is stable
  if (process.env.NODE_ENV !== 'local') return;

  await Favorite.sync({
    force: (process.env.NODE_ENV === 'local')
  });

};