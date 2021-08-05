import { signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session } = useSession();

	return (
		<div>
			<p className="text-lg" onClick={() => signOut({ callbackUrl: '/' })}>Signout</p>
			<p>{JSON.stringify(session?.user, null, 2)}</p>
		</div>
	);
}

Dashboard.auth = true;
