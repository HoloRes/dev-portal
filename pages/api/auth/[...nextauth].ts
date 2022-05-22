import NextAuth, { Session } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

declare module 'next-auth' {
	interface Session {
		user: {
			permissions: string[];
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: 'identify',
				},
			},
		}),
	],
	callbacks: {
		async redirect({ baseUrl, url }) {
			if (url === '/') return baseUrl;
			return new URL(url).host.endsWith('suisei.app')
				? url
				: `${baseUrl}/${url.replace(/^\//, '')}`;
		},
		// @ts-expect-error Types not assignable
		async session({ session, user }: { session: Session; user: User }) {
			// Inject permissions
			session.user.permissions = user.permissions; // eslint-disable-line no-param-reassign

			return session;
		},
	},
});
