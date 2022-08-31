import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectResponse, Project } from '../interfaces/projects.interface';


@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private baseUrl: string = 'http://localhost:8000/projects/get_projects_by_status/Activo';
	private _project!: Project;

	constructor(private httpClient: HttpClient) { }

	/**
	 * @description Almacena los datos del usuario despues de iniciar sesión
	 * @returns User
	 */
	get user() {
		return { ...this._project };
	}

	/**
	 * @description Hace una peticion al backend para llenar los proyectos
	 * @returns Observable<any>
	 */
	GetProjects(): Observable<any> {
		// TODO: llamar al endpoint correcto que hace el login
		const url: string = `${this.baseUrl}/`;

		return this.httpClient.get<ProjectResponse>(url)
			.pipe(
				tap(
					(res: ProjectResponse) => {
						if (res.ok) {
							this._project = {
								name: res.name!,
								uuid: res.uuid!,
								description: res.description!,
								date_start: res.date_start!,
								status: res.status
							}
						}
					}
				)
			);
	}
}
