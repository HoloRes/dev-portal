import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
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
				This is an about page
				<br/>
				<a href="https://www.buymeacoffee.com/goldelysium" target="_blank" rel="noreferrer">
					<Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height={40} width={145} />
				</a>
			</div>
		</>
	);
}

Dashboard.auth = true;
