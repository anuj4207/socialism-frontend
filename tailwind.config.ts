import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1000px',
      mobile: { max: '639px' },
    },
    colors: {
      lightPink: '#FC5185',
      lightBlue: '#3FC1C9',
      lightBlueBg: '#176B87',
      white: '#FFFFFF',
      text: '#103F53',
      lightGrey: '#D9D9D9',
    },

    borderWidth: {
      1: '1px',
      2: '2px',
      4: '4px',
    },

    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    //},
  },
  plugins: [require('daisyui')],
};
export default config;
