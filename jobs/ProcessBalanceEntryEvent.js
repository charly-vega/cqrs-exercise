const { Balance } = require('../models');

module.exports = {
  queueName: 'event.balanceEntry',
  options: {
    limiter: {
      max: 5,
      duration: 1000,
    },
  },
  async handler({ data }) {
    console.log(`handling job: ${JSON.stringify(data)}`);
    if (data.event === 'created') {
      await Balance.create(data.balance);
    }
  }
};

