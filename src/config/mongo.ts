import 'dotenv/config';

export interface MongoConfiguration {
  host: string;
  db: string;
  port: number;
  user?: string | null;
  password?: string | null;
}

export const mongoOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

export const mongoConfig: MongoConfiguration = {
  host: process.env.MONGO_HOST || '',
  db: process.env.MONGO_DB_NAME || '',
  port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : 27017,
  user: process.env.MONGO_USERNAME || null,
  password: process.env.MONGO_PASSWORD || null,
};
