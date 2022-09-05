export interface AuthResponse {
	ok?: boolean;
	uuid?: number;
	name?: string;
	identification_document?: string;
	role?: string;
	token?: string;
	message?: string;
}

export interface AuthLogin {
	username: string;
	password: string;
}

export type User = Pick<
	AuthResponse,
	'uuid' | 'name' | 'identification_document' | 'token' | 'role'
>;
