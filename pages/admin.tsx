import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';

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
			<div>
			</div>
		</>
	);
}

Dashboard.auth = true;
