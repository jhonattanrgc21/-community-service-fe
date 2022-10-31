import { Task } from "../../tasks/interfaces/tasks.iterface";

export interface RegisteredProject{
	id: number;
    name: string,
	description: string;
	date_start: string;
	identification_coordinator: string;
	coordinator: string;
	status: string
	hours: number;
	task_list: Task[];
}
