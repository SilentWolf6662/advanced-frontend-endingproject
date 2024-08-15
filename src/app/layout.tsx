import "./globals.css";

import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Advanced Frontend End Project",
	description: "This is an advanced frontend made as a frontend class end project",
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
				<Analytics />
			</body>
		</html>
	);
}
