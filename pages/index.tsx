import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tab } from '@headlessui/react';
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/solid';
import Navbar from '../components/Navbar';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);
	const { data: session } = useSession();

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log(session);
	}, [session]);

	if (!mounted) return null;

	return (
		<>
			<Navbar />
			<div className="flex w-full h-full items-center justify-center">
				<div className="w-full max-w-4xl py-16 px-2 lg:px-0">
					<Tab.Group>
						<Tab.List className="flex p-1 space-x-1 bg-blue-700/80 dark:bg-blue-900/80 rounded-xl">
							<Tab
								className={({ selected }) => classNames(
									'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
									selected
										? 'text-blue-600 bg-white dark:text-blue-400 dark:bg-gray-600/[10] shadow'
										: 'hover:bg-white/[0.12]',
								)
								}
							>
								API Keys
							</Tab>
							<Tab
								className={({ selected }) => classNames(
									'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
									selected
										? 'text-blue-600 bg-white dark:text-blue-400 dark:bg-gray-600/[10] shadow'
										: 'hover:bg-white/[0.12]',
								)
								}
							>
								Webhooks
							</Tab>
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel
								className={classNames(
									'bg-white rounded-xl p-3 dark:bg-gray-700 shadow-lg mt-2',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
								)}
							>
								{/* TODO: Something similar to DNS editor of Cloudflare */}
								<div className="flex w-full items-center gap-2">
									<div className="bg-blue-600 px-4 py-1 rounded-lg flex items-center gap-1 h-8 cursor-pointer hover:bg-blue-700"><PlusCircleIcon height={20} />Add</div>
									<div className="flex flex-grow w-full rounded-md border border-black items-center bg-white text-black gap-2 px-2 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent">
										<SearchIcon height={20} />
										<input className="flex-grow h-8 focus:outline-none" placeholder="Search API keys"/>
									</div>
								</div>
							</Tab.Panel>
							<Tab.Panel
								className={classNames(
									'bg-white rounded-xl p-3 dark:bg-gray-700 shadow-lg mt-2',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
								)}
							>
								2
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}

Dashboard.auth = true;
