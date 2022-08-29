import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskData } from './interfaces/home.interface';


const NAMES: string[] = [
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
	'Realizar BPMN de los procesos',
	'Realizar diagrama de entidad-relación',
];

const DESCRIPTION = [
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
	'Se debe utilizar la web lucidchart para construir los BPMN de los procesos de gestion y carga de datos',
	'Se debe utilizar la web lucidchart para diagramar las tablas',
]


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['Nombre', 'Descripción', 'Fecha de creación', 'Horas invertidas'];
	dataSource!: MatTableDataSource<TaskData>;
	pageNumber: number[] = [];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor() {
	}

	ngOnInit(): void {
		// Create 100 users
		const task = Array.from({ length: 18 }, (_, k) => this.createNewTask(k));

		const size = Math.floor(task.length / 5);

		for (let i = 0; i < size; i++) {
			this.pageNumber.push(5 * (i + 1));
		}

		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(task);

	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	/** Builds and returns a new User. */
	createNewTask(id: number): TaskData {
		return {
			name: NAMES[id],
			description: DESCRIPTION[id],
			createAt: '1/8/2022',
			hours: 5,
		};
	}
}

