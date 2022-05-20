import NextAuth, { Session } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async redirect({ baseUrl, url }) {
			if (url === '/') return baseUrl;
			return url.startsWith(baseUrl)
				? url
				: `${baseUrl}/${url.replace(/^\//, '')}`;
		},
		// @ts-expect-error Types not assignable
		async session({
			session,
			user,
		}: {
			session: Session & { user: { permissions: string[] } };
			user: any;
		}) {
			// eslint-disable-line max-len
			// Inject permissions
			session.user.permissions = user.permissions; // eslint-disable-line no-param-reassign

			return session;
		},
	},
});
