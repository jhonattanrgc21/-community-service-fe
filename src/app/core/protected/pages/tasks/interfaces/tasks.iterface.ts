export interface Task {
	//id: number;
	name: string;
	description: string;
	date_start: string;
	tutor: string;
	identification_tutor: string;
	hours: number;
	status: string;
}

export interface TutorTask {
	//id: number;
	name: string;
	description: string;
	date_start: string;
	responsible: string;
	identification_responsible: string;
	hours: number;
	status: string;
}
