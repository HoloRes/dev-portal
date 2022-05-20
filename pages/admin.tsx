import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<>
			<Sidebar />
			<div></div>
		</>
	);
}

Dashboard.auth = true;
