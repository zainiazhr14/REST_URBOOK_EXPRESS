'use strict';

import Book from './Book';

module.exports = async function() {
  //FIXME: remove force=true when table is stable
  if (process.env.NODE_ENV !== 'local') return;

  await Book.sync({
    force: (process.env.NODE_ENV === 'local')
  });

};