const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages('jsx');

module.exports = function highlight(code) {
  return Prism.highlight(code, Prism.languages.jsx, 'jsx');
};
