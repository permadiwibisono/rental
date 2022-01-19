import mongoose from 'mongoose';

import { MongoConfiguration } from '~/config/mongo';

export const mongoUriBuilder = (mongoConfig: MongoConfiguration) => {
  const auth = `${mongoConfig.user && mongoConfig.password ? `${mongoConfig.user}:${mongoConfig.password}@` : ''}`;
  const prefix = mongoConfig.cluster ? 'mongodb+srv' : 'mongodb';
  const port = mongoConfig.cluster ? '' : `:${mongoConfig.port}`;
  return `${prefix}://${auth}${mongoConfig.host}${port}/${mongoConfig.db}`;
};

function connect(mongoConfig: MongoConfiguration) {
  const { host, db } = mongoConfig;
  if (host === '') {
    // console.error('MONGO_HOST cannot be empty!');
    throw new Error('MONGO_HOST cannot be empty!');
  }
  if (db === '') {
    // console.error('MONGO_DB_NAME cannot be empty!');
    throw new Error('MONGO_DB_NAME cannot be empty!');
  }
  return mongoose.connect(mongoUriBuilder(mongoConfig));
}

export async function mongoClient(config: MongoConfiguration) {
  if (mongoose.STATES[mongoose.connection.readyState] !== 'connected') {
    return connect(config);
  }
  return Promise.resolve(mongoose);
}
