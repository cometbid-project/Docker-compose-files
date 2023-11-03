
// db.article.drop();
db = db.getSiblingDB('merchant_api_prod_db');
db.createUser(
  {
    user: 'api_merchant',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'merchant_api_prod_db' }],
  },
);
db.createCollection('MERCHANTS');

// db.article.drop();
db = db.getSiblingDB('merchant_api_dev_db');
db.createUser(
  {
    user: 'api_merchant',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'merchant_api_dev_db' }],
  },
);
db.createCollection('MERCHANTS');

// db.article.drop();
db = db.getSiblingDB('merchant_api_test_db');
db.createUser(
  {
    user: 'api_merchant',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'merchant_api_test_db' }],
  },
);
db.createCollection('MERCHANTS');

// =============================================

// db.article.drop();
db = db.getSiblingDB('user_api_prod_db');
db.createUser(
  {
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'user_api_prod_db' }],
  },
);
db.createCollection('USERS');

// db.article.drop();
db = db.getSiblingDB('user_api_dev_db');
db.createUser(
  {
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'user_api_dev_db' }],
  },
);
db.createCollection('USERS');

// db.article.drop();
db = db.getSiblingDB('user_api_test_db');
db.createUser(
  {
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'user_api_test_db' }],
  },
);
db.createCollection('USERS');