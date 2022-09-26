import { Component, OnInit } from '@angular/core';
import { NewProject } from '../../interfaces/projects.interface';

@Component({
	selector: 'app-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
	/* Opciones del menu */
	settings = [
		{ id: 1, title: 'Registrar un proyecto' },
		{ id: 2, title: 'Registrar varios proyectos' },
	];

	selectedOption = { ...this.settings[0] };

	pathFormat: string =
		'../../../../../../../assets/docs/registro_proyectos.xlsx';

	downloadName: string = 'registro_proyectos.xlsx';

	newProject!: NewProject;
	newProjects: NewProject[] = [];

	constructor() {}

	ngOnInit(): void {}

	onSaveProject(project: NewProject): void {
		// TODO: Realizar la peticion al backend para guardar el proyecto
		this.newProject = project;
	}

	onSaveProjects(projects: NewProject[]): void {
		// TODO: Realizar la peticion al backend para guardar los proyecto
		this.newProjects = projects;
	}
}
