import type { Metadata } from "next";
import { crimsonPro, nunitoSans } from "./fonts";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
	title: "Sópé Forest School",
	description: "Aprendizagem ao ar livre",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${crimsonPro.variable} ${nunitoSans.variable}`}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
