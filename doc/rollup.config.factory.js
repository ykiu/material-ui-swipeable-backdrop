import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

export default ({ env }) => ({
  input: './doc/index.js',
  output: [{ file: `./doc/public/bundle.js`, format: 'iife' }],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
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
    env === 'production' && terser(),
    css({ output: './doc/public/bundle.css' }),
  ],
});
