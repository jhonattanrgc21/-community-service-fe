import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/interfaces/tasks.iterface';
import { HomeService } from './services/home.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	// Listas de tareas
	tasksList: Task[] = [];

	// Listas de headers
	headersList: string[] = [];

	constructor(private _homeService: HomeService) {}

	ngOnInit(): void {
		this._homeService.findCompletedTasks().subscribe((res: Task[]) => {
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
}
