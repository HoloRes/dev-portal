import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

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
