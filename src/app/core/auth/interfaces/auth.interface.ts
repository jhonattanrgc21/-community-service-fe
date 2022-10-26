export interface AuthResponse {
	ok?: boolean;
	uuid?: number;
	name?: string;
	identification?: string;
	role?: string;
	token?: string;
	message?: string;
}

export interface AuthLogin {
	username: string;
	password: string;
}

export interface User extends Pick<
	AuthResponse,
	'uuid' | 'name' | 'identification' | 'token' | 'role'
	>{
	projectId?: number;
}
