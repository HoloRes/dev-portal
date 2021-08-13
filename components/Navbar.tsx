import { Menu } from '@headlessui/react';
import Image from 'next/image';
import { InformationCircleIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Navbar() {
	const { resolvedTheme, setTheme } = useTheme();
	const { data: session } = useSession();

	return (
		<div className="h-16 w-full">
			<div className="w-screen h-full flex justify-center gap-2 pt-2">
				{/* Navigation bar, use when Suisei v3 is released */}
			</div>
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
						as="div"
						className="cursor-pointer border-t border-gray-300 dark:border-gray-400"
					>
						<Link href="/about">
							<a className="flex items-center gap-2 m-2 ">
								<InformationCircleIcon className="h-4 w-4 text-black dark:text-white"/>About
							</a>
						</Link>
					</Menu.Item>
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
		</div>
	);
}
