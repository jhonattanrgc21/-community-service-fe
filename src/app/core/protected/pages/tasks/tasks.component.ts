import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Task, TutorTask } from './interfaces/tasks.iterface';
import { TasksService } from './services/tasks.service';
@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
	// Listas de tareas
	tasksList: Task[] | TutorTask[] = [];

	// Listas de headers
	headersList: string[] = [];

	constructor(
		private _tasksSrvices: TasksService,
		private _authService: AuthService
	) {}

	ngOnInit(): void {
		if (this._authService.user.role == 'student') {
			this._tasksSrvices
				.findAllTaskByStudent()
				.subscribe((res: Task[]) => {
					this.tasksList = res;
					this.headersList = [
						'Nombre',
						'Descripción',
						'C.I tutor',
						'Nombre del tutor',
						'Fecha de inicio',
						'Fecha de finalización',
						'Horas',
						'Estatus',
					];
				});
		}

		if (this._authService.user.role == 'tutor') {
			this._tasksSrvices
				.findAllTaskByTutor()
				.subscribe((res: TutorTask[]) => {
					this.tasksList = res;
					this.headersList = [
						'Nombre',
						'Descripción',
						'C.I estudiante',
						'Nombre del estudiante',
						'Proyecto',
						'Horas',
						'Fecha de inicio',
						'Fecha de finalización',
						'Estatus',
					];
				});
		}
	}
}
