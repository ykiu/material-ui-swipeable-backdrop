import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const deps = Object.keys(pkg.dependencies);
const peerDeps = Object.keys(pkg.peerDependencies);

export default {
  input: './src/index.js',
  output: [{ file: `${pkg.main}`, format: 'cjs' }, { file: `${pkg.module}`, format: 'es' }],
  external: id => {
    function matchesId(dependencyName) {
      return id === dependencyName || id.startsWith(`${dependencyName}/`);
    }
    return deps.some(matchesId) || peerDeps.some(matchesId);
  },
  plugins: [babel({ runtimeHelpers: true })],
};
