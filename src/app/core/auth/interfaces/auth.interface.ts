export interface AuthResponse {
	ok?: boolean;
	uuid?: number;
	name?: string;
	document?: string;
	role?: string;
	token?: string;
	message?: string;
}

export interface AuthLogin {
	email: string;
	password: string;
}

export type User = Pick<AuthResponse, 'uuid' | 'name' | 'document'>;
