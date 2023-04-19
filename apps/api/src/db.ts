import { Database, Service, ServiceOptions, IDocument } from '@paralect/node-mongo';

import config from 'config';

const database = new Database('mongodb+srv://admin:Kombatstan2000@cluster0.ofommlk.mongodb.net/?retryWrites=true&w=majority', 'Gallery');
database.connect();

class CustomService<T extends IDocument> extends Service<T> {
  // You can add new methods or override existing here
}

function createService<T extends IDocument>(collectionName: string, options: ServiceOptions = {}) {
  return new CustomService<T>(collectionName, database, options);
}

export default {
  database,
  createService,
};
