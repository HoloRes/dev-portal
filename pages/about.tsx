import { useEffect, useState } from 'react';

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div>
			This is an about page
			<br />
		</div>
	);
}

Dashboard.auth = true;
