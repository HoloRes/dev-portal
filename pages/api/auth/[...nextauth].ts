import mongoose from 'mongoose';
import NextAuth, { DefaultProfile } from 'next-auth';
import Providers from 'next-auth/providers';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import * as Prisma from '@prisma/client';
import UserData from '../../../models/userData';

// const prisma = new Prisma.PrismaClient();

interface DiscordProfile extends DefaultProfile {
	image_url?: string;
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
	debug: true,
	// adapter: PrismaAdapter(prisma),
	providers: [
		Providers.Discord({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			// @ts-expect-error profile not implementing everything
			profile(profile: DiscordProfile): UserProfile {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5;
					// eslint-disable-next-line no-param-reassign
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
				} else {
					const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
					// eslint-disable-next-line no-param-reassign
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
				}
				return {
					...profile,
					id: profile.id,
					name: profile.username,
					image: profile.image_url,
				} as DiscordProfile;
			},
		}),
	],
	callbacks: {
		async redirect({ baseUrl, url }) {
			if (url === '/') return baseUrl;
			return url.startsWith(baseUrl) ? url : `${baseUrl}/${url}`;
		},
		async jwt({ token }) {
			const doc = await UserData.findById(token.sub).exec();

			if (doc) {
				// eslint-disable-next-line no-param-reassign
				token.permissions = doc.permissions;
				return token;
			}

			const newDoc = new UserData({
				_id: token.sub,
				email: token.email,
				permissions: [],
			});

			await newDoc.save((e) => {
				if (e) throw e;
			});

			// eslint-disable-next-line no-param-reassign
			token.permissions = [];
			return token;
		},
		async session({ session, token }) {
			// Inject permissions
			// @ts-expect-error permissions doesn't exist
			session.user!.permissions = token.permissions; // eslint-disable-line no-param-reassign

			return session;
		},
	},
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
	},
	secret: process.env.AUTHSECRET,
});
