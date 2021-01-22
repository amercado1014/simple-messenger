const moment = require('moment');

function formatMessage(name, text) {
  return {
    time: moment().format('LT'),
    name,
    text
  };
}

module.exports = { formatMessage };
