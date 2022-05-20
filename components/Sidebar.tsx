import { MoonIcon, SunIcon, XIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import {
	DatabaseIcon,
	FingerPrintIcon,
	GlobeAltIcon,
	LogoutIcon,
	TemplateIcon,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

export default function Sidebar() {
	const { resolvedTheme, setTheme } = useTheme();
	const { data: session } = useSession();

	return (
		<div className="drawer-side">
			<label htmlFor="side-drawer" className="drawer-overlay" />
			<div className="flex h-full w-72 flex-col overflow-y-auto bg-secondary py-4 text-secondary-content">
				<h1 className="mt-4 flex-none text-center text-xl">
					Suisei&apos;s Mic - Dev Portal
				</h1>
				<ul className="menu flex-1 bg-secondary p-4">
					<li>
						<a>
							<GlobeAltIcon className="h-6 w-6" /> Network tokens
						</a>
					</li>
					<li>
						<a>
							<DatabaseIcon className="h-6 w-6" />
							Bans API
						</a>
					</li>
					<li>
						<a>
							<TemplateIcon className="h-6 w-6" />
							Modules
						</a>
					</li>
					<li>
						<a>
							<FingerPrintIcon className="h-6 w-6" />
							Active sessions
						</a>
					</li>
				</ul>

				<ul className="menu flex-none gap-2 p-4">
					<div className="collapse-arrow collapse" tabIndex={0}>
						<input type="checkbox" />
						<div className="collapse-title -mt-2 flex items-center gap-4">
							{session?.user && (
								<>
									<Image
										src={session.user.image!}
										alt="avatar"
										width={48}
										height={48}
										className="avatar rounded-full"
									/>
									<p className="text-lg">
										{session.user.name}
									</p>
								</>
							)}
						</div>
						<ul className="collapse-content menu menu-compact">
							<li
								onClick={() => {
									setTheme(
										resolvedTheme === 'dark'
											? 'light'
											: 'dark',
									);
								}}
							>
								{resolvedTheme === 'dark' ? (
									<div className="flex items-center gap-2">
										<SunIcon className="h-4 w-4" /> Light
										mode
									</div>
								) : (
									<div className="flex items-center gap-2">
										<MoonIcon className="h-4 w-4" /> Dark
										mode
									</div>
								)}
							</li>
							<li onClick={() => signOut()}>
								<div className="flex items-center gap-2">
									<LogoutIcon className="h-4 w-4" />
									Logout
								</div>
							</li>
						</ul>
					</div>

					<li className="lg:hidden">
						<label
							htmlFor="side-drawer"
							className="btn drawer-button btn-primary rounded-box text-white"
						>
							<XIcon className="h-6 w-6 text-white" />
						</label>
					</li>
				</ul>
			</div>
		</div>
	);
}
