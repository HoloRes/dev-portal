import mongoose, { Model } from 'mongoose';

export interface IUser {
	_id: string;
	id: string;
	email: string;
	emailVerified: boolean;
	image: string;
	permissions: string[];
}

const UserDataSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	id: { type: String, required: true },
	email: { type: String, required: true },
	emailVerified: { type: Boolean, required: true },
	image: { type: String, required: true },
	name: { type: String, required: true },
	permissions: { type: [String] },
});

// eslint-disable-next-line import/no-mutable-exports
let model;
try {
	model = mongoose.model<IUser>('User');
} catch {
	model = mongoose.model<IUser>('User', UserDataSchema, 'users');
}
export default model as Model<IUser>;
