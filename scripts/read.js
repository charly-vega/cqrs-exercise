const models = require('../models');

setInterval(
  () => {
    const timeToken = `rand(${Math.floor(100000 + Math.random() * 900000)})`;
    console.time(timeToken);
    models.sequelize.query(`
      SELECT users.id, users.fullName, currency, sum(amount) 
      FROM balances, users, accounts 
      WHERE users.id = accounts.userId
      AND accounts.id = balances.accountId
      GROUP BY users.id, users.fullName, currency
    `).then(
      ([results, metadata]) => console.timeEnd(timeToken),
      (error) => console.log(timeToken + ':', error.message)
    );
  },
  100
);

