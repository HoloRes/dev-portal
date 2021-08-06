import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';

export default function Dashboard() {
	const { resolvedTheme, setTheme } = useTheme();
	const { data: session } = useSession();

	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log(session);
	}, [session]);

	if (!mounted) return null;

	return (
		<>
			<Menu className="absolute right-0 top-0" as="div">
				<Menu.Button>
					<div className="flex flex-row-reverse items-center gap-2 pr-2 pt-2">
						<Image src={session.user.image} width={50} height={50}
							className="rounded-full"
						/>
						<p className="text-lg">{session.user.name}</p>
					</div>
				</Menu.Button>
				<Menu.Items>
					<Menu.Item
						onClick={() => {
							setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
						}}
						as="div"
						className="cursor-pointer border-t border-gray-300 dark:border-gray-400"
					>
						{
							resolvedTheme === 'dark'
								? <div className="flex gap-2 items-center m-2"><SunIcon className="h-4 w-4 text-white"/> Light mode</div>
								: <div className="flex gap-2 items-center m-2"><MoonIcon className="h-4 w-4 text-black"/> Dark mode</div>
						}
					</Menu.Item>
					<Menu.Item
						onClick={() => signOut()}
						as="div"
						className="cursor-pointer border-t border-gray-300 dark:border-gray-400"
					>
						<div className="flex items-center gap-2 m-2 ">
							<LogoutIcon className="h-4 w-4 text-black dark:text-white"/>Logout
						</div>
					</Menu.Item>
				</Menu.Items>
			</Menu>
			<div>
			</div>
		</>
	);
}

Dashboard.auth = true;
