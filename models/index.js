const Sequelize = require('sequelize');

// initialize connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE_PATH || './db.sqlite',
  logging: false,
  retry: 0,
});

// set up models
const User = require('./User')(sequelize, Sequelize);
const Account = require('./Account')(sequelize, Sequelize);
const Balance = require('./Balance')(sequelize, Sequelize);

// set up associations
Account.belongsTo(User);
User.hasMany(Account);

Balance.belongsTo(Account);
Account.hasMany(Balance);

module.exports = {
  User,
  Account,
  Balance,
  sequelize,
};

