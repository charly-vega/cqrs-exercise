const models = require('../models');
const { randomInt } = require('../lib/util');

const extractIds = xs => xs.map(({ id }) => id);

setInterval(async function generateUserAccountsReport() {
  try { 
    const userIds = await models.User.findAll({ attributes: ['id'], raw: true }).then(extractIds);

    const timeToken = `rand(${Math.floor(100000 + Math.random() * 900000)})`;
    console.time(timeToken);
    
    const randomUserId = userIds[randomInt(userIds.length)];
    
    models.sequelize.query(`
      SELECT users.id, users.fullName, accounts.id, currency, sum(amount) 
      FROM balances, users, accounts 
      WHERE users.id = accounts.userId
      AND users.id = ?
      AND accounts.id = balances.accountId
      GROUP BY users.id, users.fullName, accounts.id, currency
    `, { replacements: [randomUserId] }).then(
      ([results, metadata]) => console.timeEnd(timeToken),
      (error) => console.log(timeToken + ':', error.message)
    );
  } catch (error) {
    console.log(error);
  }
}, 100);

