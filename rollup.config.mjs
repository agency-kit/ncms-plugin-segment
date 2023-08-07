import esbuild from 'rollup-plugin-esbuild'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  plugins: [esbuild(), terser()],
  output: [
    { format: 'esm', file: './dist/index.js' },
  ],
}
