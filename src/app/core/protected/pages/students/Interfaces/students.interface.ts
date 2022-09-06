export interface Student {
	id: number;
	identification: string;
	first_name: string;
	last_name: string;
	/*email: string;
	phone: string;*/
	career: string;
	total_hours: number;
}

export interface AssignedStudent extends Student{
	project: string;
}
export interface ApprovedStudent extends AssignedStudent {
	date_approval: string;
};


