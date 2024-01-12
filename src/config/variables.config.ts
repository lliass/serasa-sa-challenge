import * as dotenv from 'dotenv';

dotenv.config();

const authVariables = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
  allowedEmailDomains: process.env.ALLOWED_EMAIL_DOMAINS || '',
};

const apiVariables = {
  port: process.env.PORT || 3000,
  allowedDomains: process.env.ALLOWED_DOMAINS || '',
};

const postgresVariables = {
  host: process.env.POSTGRES_DB_HOST || '',
  port: process.env.POSTGRES_DB_PORT || '',
  username: process.env.POSTGRES_DB_USERNAME || '',
  password: process.env.POSTGRES_DB_PASSWORD || '',
  dbName: process.env.POSTGRES_DB_NAME || '',
};

export { authVariables, apiVariables, postgresVariables };
