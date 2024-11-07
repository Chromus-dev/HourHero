import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { SessionProvider } from '@/providers/SessionProvider';
import { auth } from '@/lib/auth';

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
	const sessionData = await auth();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<SessionProvider value={sessionData}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
						<SpeedInsights />
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
