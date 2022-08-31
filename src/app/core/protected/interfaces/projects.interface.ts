export interface ProjectResponse {
	ok?: boolean;
	uuid?: number;
	name?: string;
	description?: string;
	date_start?: string;
	status?: string;
}

export type Project = Pick<ProjectResponse, 'uuid' | 'name' | 'description'  | 'date_start' | 'status'>;
