export interface Project {
	id?: number;
	name?: string;
	description?: string;
	date_start?: string;
	date_end?: string;
	status?: string;
	student_count?: number;
}

export interface ProjectDetails extends Omit<Project, 'student_count'> {
	career_name?: string;
	coordinator_id?: number;
	coordinator_identification?: string;
	coordinator_first_name?: string;
	coordinator_last_name?: string;
}
