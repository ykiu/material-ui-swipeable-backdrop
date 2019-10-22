const PATTERN = /\/\/\s=>\s(.*)/;

module.exports = function processMagicComments(str) {
  const linesInput = str.split('\n');
  const linesOutput = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const line of linesInput) {
    const match = PATTERN.exec(line);
    if (match) {
      linesOutput.pop();
      linesOutput.push(match[1]);
    } else {
      linesOutput.push(line);
    }
  }
  return linesOutput.join('\n');
};
