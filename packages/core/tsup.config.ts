import type { Options } from 'tsup'

export const tsup: Options = {
  entry: [
    './src/index.ts',
    './src/gsap/index.ts',
  ],
  external: [
    'vue',
    'animate.css',
    'gsap',
  ],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: true,
  clean: true,
}
