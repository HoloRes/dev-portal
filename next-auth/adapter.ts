import { Adapter } from 'next-auth/adapters';
import { Profile, Session as SessionType, User as UserType } from 'next-auth';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import UserData, { IUser } from '../models/userData';
import Session, { ISession } from '../models/session';

try {
	mongoose.connect(<string>process.env.MONGOOSEURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
// eslint-disable-next-line no-empty
} catch (e) {}

// eslint-disable-next-line max-len
const MongoDBAdapter: Adapter<undefined, never, UserType & { id: string }, Profile, SessionType> = () => ({
	// @ts-expect-error Types not correctly overlapping
	async getAdapter({ session }) {
		const sessionMaxAge = session.maxAge * 1000;
		const sessionUpdateAge = session.updateAge * 1000;

		return {
			displayName: 'MONGODB',
			async createUser(profile) {
				const doc = new UserData({
					_id: profile.id,
					id: profile.id,
					email: profile.email,
					name: profile.name,
					emailVerified: profile.verified ?? null,
					image: profile.image,
					permissions: [],
				});

				await doc.save((e) => {
					if (e) throw e;
				});

				return doc;
			},

			async getUser(id) {
				const doc = await UserData.findById(id).lean().exec();

				return doc;
			},

			async getUserByEmail(email: string) {
				const doc = await UserData.findOne({ email }).lean().exec();

				return doc;
			},

			async getUserByProviderAccountId(providerId: string, providerAccountId: string) {
				const doc = await UserData.findById(providerAccountId).lean().exec();

				return doc;
			},

			async updateUser(user: IUser) {
				const doc = await UserData.findByIdAndUpdate(user._id, user);

				return doc;
			},

			async deleteUser(id) {
				await UserData.findByIdAndDelete(id);
			},

			async linkAccount(id) {
				// * Needs updating if there's a need to actually support multiple providers
				const doc = await UserData.findById(id).lean().exec();

				return doc;
			},

			async unlinkAccount(id) {
				// * Needs updating if there's a need to actually support multiple providers
				const doc = await UserData.findById(id).lean().exec();

				return doc;
			},

			async createSession(user) {
				const doc = new Session({
					userId: user.id,
					expires: new Date(Date.now() + sessionMaxAge),
					sessionToken: randomBytes(32).toString('hex'),
					accessToken: randomBytes(32).toString('hex'),
				});

				await doc.save((e) => {
					if (e) throw e;
				});

				return doc;
			},

			async getSession(sessionToken) {
				const doc = await Session.findOne({ sessionToken }).lean().exec();

				if (!doc) return null;

				if (doc.expires < new Date()) {
					await Session.findOneAndDelete({ sessionToken }).lean().exec();
					return null;
				}

				return doc;
			},

			async updateSession(currentSession: ISession, force: boolean) {
				if (
					!force
					&& Number(currentSession.expires) - sessionMaxAge + sessionUpdateAge
					> Date.now()
				) {
					return null;
				}

				const doc = await Session.findOneAndUpdate({ sessionToken: currentSession.sessionToken }, {
					expires: new Date(Date.now() + sessionMaxAge),
				}, { returnOriginal: false }).lean().exec();

				return doc;
			},

			async deleteSession(sessionToken) {
				await Session.findOneAndDelete({ sessionToken }).exec();
			},
		};
	},
});

export default MongoDBAdapter;
