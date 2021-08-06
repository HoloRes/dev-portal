import mongoose from 'mongoose';
import NextAuth, { DefaultProfile, Session } from 'next-auth';
import Providers from 'next-auth/providers';
import adapter from '../../../next-auth/adapter';
import { IUser } from '../../../models/userData';

// const prisma = new Prisma.PrismaClient();

interface DiscordProfile extends DefaultProfile {
	id: string;
	avatar: string;
	username: string;
	discriminator: string;
}

try {
	mongoose.connect(<string>process.env.MONGOOSEURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
// eslint-disable-next-line no-empty
} catch (e) {}

export default NextAuth({
	adapter: adapter(undefined),
	providers: [
		Providers.Discord({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			// @ts-expect-error profile not implementing everything
			profile(profile: DiscordProfile): UserProfile {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5;
					// eslint-disable-next-line no-param-reassign
					profile.image = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
				} else {
					const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
					// eslint-disable-next-line no-param-reassign
					profile.image = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
				}
				return {
					...profile,
					id: profile.id,
					name: profile.username,
				} as DiscordProfile;
			},
		}),
	],
	callbacks: {
		async redirect({ baseUrl, url }) {
			if (url === '/') return baseUrl;
			return url.startsWith(baseUrl) ? url : `${baseUrl}/${url.replace(/^\//, '')}`;
		},

		// @ts-expect-error Types not assignable
		async session({ session, user }: { session: Session & { user: { permissions: string[] } }, user: IUser }) { // eslint-disable-line max-len
			// Inject permissions
			session.user.permissions = user.permissions; // eslint-disable-line no-param-reassign

			return session;
		},
	},
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
	},
	secret: process.env.AUTHSECRET,
});
