import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ["var(--font-crimson-pro)"],
				sans: ["var(--font-nunito-sans)"],
			},
			colors: {
				"brand-dark": "#3C2913", // For links and main text
				"brand-warm": "#A15B43", // For headings
				"brand-accent": "#E2B44D", // For CTA buttons
				"brand-light": "#F0EDDD", // For optional backgrounds
			},
		},
	},
	plugins: [],
};
export default config;
