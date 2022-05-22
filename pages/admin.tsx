export default function AdminPage() {
	return (
		<div className="layout">
			This is an admin page
			<br />
		</div>
	);
}

AdminPage.options = {
	auth: true,
	permission: 'admin',
};
