export interface Task {
	id: number;
	name: string;
	description: string;
	tutor_indentification: string;
	tutor_name: string;
	date_start: string;
	date_end: string;
	cost: number;
	status: string;
}

export interface TutorTask {
	id: number;
	name: string;
	description: string;
	student_indentification: string;
	student_name: string;
	project_id: number,
    project_name: string,
	cost: number;
	date_start: string;
	date_end: string;
	status: string;
}
