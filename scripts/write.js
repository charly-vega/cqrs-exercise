const Queue = require('bull');

const models = require('../models');
const { randomInt } = require('../lib/util');

const { Jobs } = require('../jobs');
const balanceEntryEventsQueue = new Queue('event.balanceEntry')

const randomAmount = () => randomInt(100) - randomInt(100);
const randomNames = ['Kamren Sawyer', 'Fabian Meadows', 'Genesis Stewart', 'Jayla Crawford', 'Kristina Lynn', 'Louis Ware', 'Harper Compton', 'Jaslene Stanton', 'Justine Dodson', 'Alejandra Bauer', 'Ray Mcneil', 'Kaiya Carr'];

const extractIds = xs => xs.map(({ id }) => id);

(async () => {
  try {
    for (i = 0; i < 10; i++) {
      const user = await models.User.create({
        fullName: randomNames[randomInt(randomNames.length - 1)]
      });
      console.log(`Created user ${user.id}`);
    }

    const userIds = await models.User.findAll({ attributes: ['id'], raw: true });
    for (let userId of userIds.map(user => user.id)) {
      for (i = 0; i < 5; i++) {
        const account = await models.Account.create({ currency: 'UYU', userId });
        console.log(`Created account ${account.id}`);
      }
    }

    let amount;
    const accountIds = await models.Account.findAll({ attributes: ['id'], raw: true }).then(extractIds);
    
    for (;;) {
      amount = randomAmount();
      balanceEntry = {
	accountId: accountIds[randomInt(accountIds.length)],
	amount,
	concept: amount >= 0 ? 'deposit' : 'withdrawal'
      };
      console.log(balanceEntry);
      // await models.Balance.create(balanceEntry);
      await Jobs.ProcessBalanceEntryEvent.add({ event: 'created', balance: balanceEntry });
    }
  } catch (e) { console.log(e); }
})();

