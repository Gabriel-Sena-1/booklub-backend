import dotenv from 'dotenv';

dotenv.config();

const databaseType = process.env.DATABASE_TYPE ?? 'mysql';
export const ENV = {
  // incluir class-validator?
  DatabaseVariables: {
    type: databaseType as 'mysql' | 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  AppVariables: {
    port: Number(process.env.APP_PORT) || 3000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET
  },
  CacheVariables: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    redisUrl: process.env.REDIS_URL,
    namespace: process.env.REDIS_NAMESPACE,
    ttl: process.env.REDIS_TTL,
  },
};
