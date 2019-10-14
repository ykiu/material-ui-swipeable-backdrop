const fs = require('fs');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages('jsx');

module.exports = function highlight(path) {
  const code = fs.readFileSync(path, 'utf8');
  return Prism.highlight(code, Prism.languages.jsx, 'jsx');
}
