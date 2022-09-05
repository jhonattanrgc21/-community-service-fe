import { Component, OnInit } from '@angular/core';
import { Task, TutorTask } from './interfaces/tasks.iterface';
@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
	// Listas de tareas
	allTasks: Task[] = [
		{
			name: 'Tarea 1',
			description: 'Prueba 1',
			date_start: '4/09/2022',
			tutor: 'Usuario Aadmin',
			identification_tutor: '123456',
			hours: 12,
			status: 'En progreso',
		},
		{
			name: 'Tarea 2',
			description: 'Prueba 2',
			date_start: '4/09/2022',
			tutor: 'Usuario Aadmin',
			identification_tutor: '123456',
			hours: 12,
			status: 'En progreso',
		},
		{
			name: 'Tarea 3',
			description: 'Prueba 3',
			date_start: '4/09/2022',
			tutor: 'Usuario Aadmin',
			identification_tutor: '123456',
			hours: 12,
			status: 'En progreso',
		},
	];

	tutorTasks: TutorTask[] = [
		{
			name: 'Tarea 1',
			description: 'Prueba 1',
			date_start: '4/09/2022',
			responsible: 'Usuario Aadmin',
			identification_responsible: '123456',
			hours: 12,
			status: 'En progreso',
		},
		{
			name: 'Tarea 2',
			description: 'Prueba 2',
			date_start: '4/09/2022',
			responsible: 'Usuario Aadmin',
			identification_responsible: '123456',
			hours: 12,
			status: 'En progreso',
		},
		{
			name: 'Tarea 3',
			description: 'Prueba 3',
			date_start: '4/09/2022',
			responsible: 'Usuario Aadmin',
			identification_responsible: '123456',
			hours: 12,
			status: 'En progreso',
		},
	];

	// Listas de headers
	allTaskHeaders: string[] = [
		'Nombre',

		'Descripción',
		'Fecha de inicio',
		'Tutor',
		'Cedula del tutor',
		'Horas estimadas',
		'Estatus',
	];

	tutorTaskHeaders: string[] = [
		'Nombre',
		'Descripción',
		'Fecha de inicio',
		'Responsable',
		'Cedula del responsable',
		'Horas estimadas',
		'Estatus',
	];
	constructor() {}

	ngOnInit(): void {}
}
