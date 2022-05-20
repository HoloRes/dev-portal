import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/solid';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="w-full max-w-4xl py-16 px-2 lg:px-0">
				<Tab.Group>
					<Tab.List className="flex space-x-1 rounded-xl bg-blue-700/80 p-1 dark:bg-blue-900/80">
						<Tab
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white text-blue-600 shadow dark:bg-gray-600/[10] dark:text-blue-400'
										: 'hover:bg-white/[0.12]',
								)
							}
						>
							API Keys
						</Tab>
						<Tab
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white text-blue-600 shadow dark:bg-gray-600/[10] dark:text-blue-400'
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
								'mt-2 rounded-xl bg-white p-3 shadow-lg dark:bg-gray-700',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
							)}
						>
							{/* TODO: Something similar to DNS editor of Cloudflare */}
							<div className="flex w-full flex-wrap items-center gap-2">
								<div className="flex h-8 cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-4 py-1 text-white hover:bg-blue-700">
									<PlusCircleIcon height={20} />
									Add
								</div>
								<div className="flex flex-grow items-center gap-2 rounded-md border border-black bg-white px-2 text-black focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-400">
									<SearchIcon height={20} />
									<input
										className="h-8 flex-grow focus:outline-none"
										placeholder="Search API keys"
									/>
								</div>
							</div>
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'mt-2 rounded-xl bg-white p-3 shadow-lg dark:bg-gray-700',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
							)}
						>
							2
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}

Dashboard.auth = true;
