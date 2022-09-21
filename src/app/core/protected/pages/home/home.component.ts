import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/interfaces/tasks.iterface';
import { RegisteredProject } from './interfaces/home.interface';
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

	cardInfo!: RegisteredProject;

	pendingHours: number = 120;

	constructor(private _homeService: HomeService) {}

	ngOnInit(): void {
		this._homeService
			.findCompletedTasks()
			.subscribe((res: RegisteredProject) => {
				this.cardInfo = res;
				this.tasksList = res.task_list;

				this.pendingHours -= this.cardInfo.hours;

				if (this.pendingHours < 0) {
					this.pendingHours = 0;
				}

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
