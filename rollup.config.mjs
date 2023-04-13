import esbuild from 'rollup-plugin-esbuild'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  plugins: [esbuild(), terser()],
  output: [
    { format: 'esm', file: './dist/index.mjs' },
    { format: 'cjs', file: './dist/index.js' },
  ]
};
