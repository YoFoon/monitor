import path from 'path';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

// 去掉循环引用的警告
const onWarn = warning => {
  if (
    warning.code === 'CIRCULAR_DEPENDENCY' &&
    !warning.importer.indexOf(path.normalize('src/index.js'))
  ) {
    return;
  }
  console.warn(`(!) ${warning.message}`);
};

export default {
  input: './src/index.js',
  onwarn: onWarn,
  output: {
    file: './dist/monitor.js',
    format: 'iife',
    name: 'monitor',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    terser(),
  ],
};
