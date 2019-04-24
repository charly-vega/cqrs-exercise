const models = require('../models');

const randomInt = (max = 100) => Math.ceil(Math.random() * max);
const randomAmount = () => randomInt(100) - randomInt(200);
const randomNames = ['Kamren Sawyer', 'Fabian Meadows', 'Genesis Stewart', 'Jayla Crawford', 'Kristina Lynn', 'Louis Ware', 'Harper Compton', 'Jaslene Stanton', 'Justine Dodson', 'Alejandra Bauer', 'Ray Mcneil', 'Kaiya Carr'];

(async () => {
  try {
    for (i = 0; i < 100; i++) {
      const user = await models.User.create({
        fullName: randomNames[randomInt(randomNames.length - 1)]
      });
      console.log(`Created user ${user.id}`);
    }

    const userIds = await models.User.findAll({ attributes: ['id'], raw: true });
    for (let userId of userIds.map(user => user.id)) {
      for (i = 0; i < 10; i++) {
        const account = await models.Account.create({ currency: 'UYU', userId });
        console.log(`Created account ${account.id}`);
      }
    }

    let amount;
    const accountIds = await models.Account.findAll({ attributes: ['id'], raw: true });
    
    for (let accountId of accountIds.map(account => account.id)) {
      for (i = 0; i < 1000; i++) {
        amount = randomAmount();
        balanceEntry = {
          accountId,
          amount,
          concept: amount >= 0 ? 'deposit' : 'withdrawal'
        };
        console.log(balanceEntry);
        await models.Balance.create(balanceEntry);
      }
    }
  } catch (e) { console.log(e); }
})();

