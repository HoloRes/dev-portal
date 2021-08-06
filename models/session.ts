import mongoose, { Model } from 'mongoose';
import { Session } from 'next-auth';

export type ISession = Session & {
	id: string;
	expires: Date;
	sessionToken: string;
	accessToken: string;
};

const SessionSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	expires: { type: Date, required: true },
	sessionToken: { type: String, required: true },
	accessToken: { type: String, required: true },
});

// eslint-disable-next-line import/no-mutable-exports
let model;
try {
	model = mongoose.model<ISession>('Session');
} catch {
	model = mongoose.model<ISession>('Session', SessionSchema, 'sessions');
}
export default model as Model<ISession>;
