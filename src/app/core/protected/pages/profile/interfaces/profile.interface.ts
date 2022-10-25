export interface GeneralProfile{
	id: number;
	first_name: string;
	last_name: string;
	identification: string;
	phone: string;
	email: string;
	username: string;
	career: string;
}

export interface ChangePassowrd {
	old_password: string;
	password: string;
	confirm_password: string;
	identification: string;
}
