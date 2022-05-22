import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import { MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import NotAuthorized from '../components/NotAuthorized';

interface CustomAppProps extends Omit<AppProps, 'Component'> {
	Component: AppProps['Component'] & {
		options?: {
			auth?: boolean;
			permission?: string;
		};
	};
}

interface IWrapperProps {
	children: JSX.Element;
	permission?: string;
}

function Auth({ children, permission }: IWrapperProps): JSX.Element | null {
	const { data: session, status } = useSession();
	const isUser = !!session?.user;

	useEffect(() => {
		if (status === 'loading') return;
		if (!isUser) signIn('discord');
	}, [status, isUser]);

	if (isUser) {
		if (permission && !session?.user?.permissions.includes(permission)) {
			return <NotAuthorized />;
		}
		return children;
	}

	return <div>Loading...</div>;
}

function DrawerWrapper({ children }: IWrapperProps): JSX.Element {
	return (
		<div className="drawer-mobile drawer h-full min-h-screen">
			<input type="checkbox" className="drawer-toggle" id="side-drawer" />

			<div className="drawer-content">
				<div className="navbar bg-secondary text-secondary-content lg:hidden">
					<label
						htmlFor="side-drawer"
						className="btn drawer-button btn-primary flex-none text-white lg:hidden"
					>
						<MenuIcon className="h-6 w-6 text-white" />
					</label>
					<Link href="/" passHref>
						<a className="btn btn-ghost flex-none text-lg normal-case">
							Suisei&apos;s Mic - Developer portal
						</a>
					</Link>
				</div>

				{children}
			</div>

			<Sidebar />
		</div>
	);
}

function App({ Component, pageProps }: CustomAppProps) {
	return (
		<>
			<Head>
				<title>Suisei&apos;s Mic - Dev portal</title>
			</Head>
			<ThemeProvider defaultTheme="system" themes={['dark', 'light']}>
				<SessionProvider session={pageProps.session}>
					{Component.options?.auth ? (
						<Auth permission={Component.options.permission}>
							<DrawerWrapper>
								<Component {...pageProps} />
							</DrawerWrapper>
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</SessionProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
