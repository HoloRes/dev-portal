import { PlusCircleIcon, SearchIcon } from '@heroicons/react/solid';

export default function Modules() {
	return (
		<div className="layout">
			<div className="card w-8/12 bg-secondary text-secondary-content">
				<div className="card-body items-center text-center">
					<h1 className="card-title">Module list</h1>
					{/* TODO: Something similar to DNS editor of Cloudflare */}
					<div className="flex w-full flex-wrap items-center gap-2">
						<div className="btn btn-primary normal-case">
							<PlusCircleIcon height={20} />
							Add
						</div>
						<div className="input flex grow items-center">
							<SearchIcon height={20} />
							<input
								className="input h-8 grow focus:outline-none"
								placeholder="Search API keys"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Modules.options = {
	auth: true,
};
