import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-only';

export default {
  input: './index.js',
  output: [{ file: `./build/bundle.js`, format: 'iife' }],
  plugins: [
    babel({ runtimeHelpers: true }),
    resolve({}),
    commonjs({
      namedExports: {
        react: [
          'isValidElement',
          'Children',
          'cloneElement',
          'useState',
          'useCallback',
          'useEffect',
        ],
        'prop-types': ['elementType'],
        'react-is': ['ForwardRef'],
      },
    }),
    css({ output: './build/bundle.css' }),
  ],
};
