import Link from 'next/link';

export default function NotAuthorized() {
	return (
		<div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-8">
			<span className="text-4xl">
				You&apos;re not authorized to see this page
			</span>
			<Link href="/" passHref>
				<a className="btn btn-primary">Go back</a>
			</Link>
		</div>
	);
}
