import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

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
