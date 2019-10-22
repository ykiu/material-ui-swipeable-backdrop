import processMagicComments from './processMagicComments';

describe('processMagicComments', () => {
  it('changes `foo();⏎// => bar();` to just `bar();`', () => {
    // eslint-disable-next-line prettier/prettier
    const input = (
      'foo();\n' +
      '// => bar();\n' +
      'baz();\n'
      );
    // eslint-disable-next-line prettier/prettier
    const output = (
      'bar();\n' +
      'baz();\n'
    )
    expect(processMagicComments(input)).toEqual(output);
  });
});
