import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { dbConnection } from '@/lib/mongo';

import mongoose from 'mongoose';
import { Provider } from './provider';

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

	mongoose.connection.on('connected', () =>
		console.log('mongoose connected')
	);
	mongoose.connection.on('open', () => console.log('mongoose open'));
	mongoose.connection.on('disconnected', () =>
		console.log('mongoose disconnected')
	);
	mongoose.connection.on('reconnected', () =>
		console.log('mongoose reconnected')
	);
	mongoose.connection.on('disconnecting', () =>
		console.log('mongoose disconnecting')
	);
	mongoose.connection.on('close', () => console.log('mongoose close'));

	return (
		<html lang="en">
			<Provider>
				<body className={inter.className}>
					{children}
					<SpeedInsights />
				</body>
			</Provider>
		</html>
	);
}
