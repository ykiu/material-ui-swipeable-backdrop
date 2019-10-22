const fs = require('fs');
const processMagicComments = require('./processMagicComments');
const highlight = require('./highlight');

module.exports = function processCode(path) {
  const code = fs.readFileSync(path, 'utf8');
  return highlight(processMagicComments(code));
};
