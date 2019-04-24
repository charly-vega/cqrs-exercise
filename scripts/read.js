const models = require('../models');
const { randomInt } = require('../lib/util');

setInterval(
  () => {
    const timeToken = `rand(${Math.floor(100000 + Math.random() * 900000)})`;
    console.time(timeToken);
    
    const randomUserId = 1 + randomInt(99);
    
    models.sequelize.query(`
      SELECT users.id, users.fullName, accounts.id, currency, sum(amount) 
      FROM balances, users, accounts 
      WHERE users.id = accounts.userId
      AND users.id = ?
      AND accounts.id = balances.accountId
      GROUP BY users.id, users.fullName, accounts.id, currency
    `, { replacements: [randomUserId] }).then(
      ([results, metadata]) => console.log(results) || console.timeEnd(timeToken),
      (error) => console.log(timeToken + ':', error.message)
    );
  },
  100
);

