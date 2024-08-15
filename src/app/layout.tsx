import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
