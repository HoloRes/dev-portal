import Image from 'next/image';

export default function AboutPage() {
	return (
		<div className="layout">
			<div className="card bg-secondary text-secondary-content lg:w-4/12">
				<div className="card-body">
					<h1 className="card-title">
						Suisei&apos;s Mic - Developer portal
					</h1>
					Welcome to the developer portal! This is the place where you
					can manage everything, for example the API keys for the Bans
					API or modules for the bot.
					<br />
					<span>
						Missing access to something? You can request approval{' '}
						<a
							href="https://support.suisei.app"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							here
						</a>
						.
					</span>
					<hr className="my-2 border border-accent" />
					<div className="flex items-center gap-2">
						<span className="text-xs">
							Help me keep the bot online:
						</span>
						<a
							href="https://ko-fi.com/M4M33WLUM"
							target="_blank"
							rel="noreferrer"
						>
							<Image
								height={36}
								width={143}
								style={{ border: 0, height: '36px' }}
								src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3"
								alt="Buy Me a Coffee at ko-fi.com"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

AboutPage.options = {
	auth: true,
};
