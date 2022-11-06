import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/shared/constants/constants';
import Swal from 'sweetalert2';
import { NewProject } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

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

	constructor(
		private _projectService: ProjectService,
		private _router: Router
	) {}

	ngOnInit(): void {}

	onSaveProject(project: NewProject): void {
		this.newProject = project;
		this._projectService.createProject(project).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Proyecto registrado con exito!',
					icon: 'success',
				});
				this._router.navigateByUrl(ROUTES.activeProject);
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo registrar el proyecto',
					icon: 'error',
				});
			}
		});
	}

	onSaveProjects(projects: NewProject[]): void {
		this.newProjects = projects;
		this._projectService.createProjects(projects).subscribe((res) => {
			if (res) {
				let message: string = '';
				const total = res.successful.length + res.failed.length;
				const sizeSuccess = res.successful.length;
				const sizeFailed = res.failed.length;

				if (sizeFailed == 0) {
					Swal.fire({
						title: 'Guardado',
						text: 'La operación fue realizada con exito!',
						icon: 'success',
					});
				} else {
					if (sizeSuccess > 0 && sizeFailed > 0) {
						Swal.fire({
							text: `Se registraron ${total} proyecto(s) de ${sizeSuccess}`,
							icon: 'info',
						});
					} else {
						Swal.fire({
							text: 'Los proyecto(s) ya se encuentran registrado(s)',
							icon: 'info',
						});
					}
				}
				this._router.navigateByUrl(ROUTES.activeProject);
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo realizar la operación',
					icon: 'error',
				});
			}
		});
	}
}
