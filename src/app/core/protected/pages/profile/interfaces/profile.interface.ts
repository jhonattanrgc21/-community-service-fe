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
	current_password: string;
	new_password: string;
	confirm_new_password: string;
}
