require('dotenv/config');

const developmentConfig = () => ({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
});

const testConfig = 'sqlite::memory:';

const productionConfig = process.env.CLEARDB_DATABASE_URL;

const NODE_ENV = process.env.NODE_ENV;
let config;

if (NODE_ENV === 'production') {
  config = productionConfig;
} else if (NODE_ENV === 'test') {
  config = testConfig;
} else {
  config = developmentConfig();
}

module.exports = config;
