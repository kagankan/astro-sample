// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./src/data/config.cjs');

/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.astro', './src/scenes/**/*.ts'],
  theme: {
    screens: {
      pc: { raw: `screen and ${config.pcQueryString}, print` },
      sp: { raw: `screen and ${config.spQueryString}` },
    },
    colors: {
      white: '#fff',
      black: '#000',
    },
  },
};
