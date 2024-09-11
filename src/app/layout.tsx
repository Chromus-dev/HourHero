import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { dbConnection } from '@/lib/mongo';

import mongoose from 'mongoose';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'HourHero',
	description: 'Easily manage your volunteer organizations',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const connection = await dbConnection();

	console.log(mongoose.connection.readyState);

	mongoose.connection.on('connected', () => console.log('connected'));
	mongoose.connection.on('open', () => console.log('open'));
	mongoose.connection.on('disconnected', () => console.log('disconnected'));
	mongoose.connection.on('reconnected', () => console.log('reconnected'));
	mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
	mongoose.connection.on('close', () => console.log('close'));

	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
