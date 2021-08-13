import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

interface IAuthProps {
	children: JSX.Element
}

function Auth({ children }: IAuthProps): JSX.Element | null {
	const { data: session, status } = useSession();
	const isUser = !!session?.user;

	useEffect(() => {
		if (status === 'loading') return;
		if (!isUser) signIn('discord');
	}, [status, isUser]);

	if (isUser) {
		return children;
	}

	return <div>Loading...</div>;
}

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Suisei - dev portal</title>
			</Head>
			<ThemeProvider defaultTheme="system" attribute="class">
				<SessionProvider session={pageProps.session}>
					<div className="min-h-screen h-full dark:bg-gray-800 dark:text-white">
						{ /* @ts-expect-error auth doesn't exist */ }
						{Component.auth ? (
							<Auth>
								<Component {...pageProps} />
							</Auth>
						) : (
							<Component {...pageProps} />
						)}
					</div>
				</SessionProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
