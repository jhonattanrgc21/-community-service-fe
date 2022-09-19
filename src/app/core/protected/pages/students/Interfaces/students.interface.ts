import { GeneralProfile } from "../../profile/interfaces/profile.interface";

export interface Student {
	id: number;
	identification: string;
	first_name: string;
	last_name: string;
	career: string;
	total_hours: number;
}

export interface AssignedStudent extends Student{
	project: string;
}
export interface ApprovedStudent extends AssignedStudent {
	date_approval: string;
};

export interface NewStudent extends Omit<GeneralProfile, 'username' | 'id'>{
	role: string;
}
