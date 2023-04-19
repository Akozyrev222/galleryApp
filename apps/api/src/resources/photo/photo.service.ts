import _ from 'lodash';

import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './photo.schema';
import { Photo } from './photo.types';

const service = db.createService<Photo>(DATABASE_DOCUMENTS.PHOTOS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const updateLastRequest = (_id: string) => {
  const date = new Date();

  return service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: date,
      },
    },
  );
};




export default Object.assign(service, {
  updateLastRequest,
});
