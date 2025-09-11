import { Crimson_Pro, Nunito_Sans } from "next/font/google";

export const crimsonPro = Crimson_Pro({
	subsets: ["latin"],
	weight: ["300", "500"],
	variable: "--font-crimson-pro",
	display: "swap",
});

export const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-nunito-sans",
	display: "swap",
});
