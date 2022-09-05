import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../../../interfaces/projects.interface';


@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private _baseUrl: string = environment.baseUrlProjects;

	constructor(private httpClient: HttpClient) {}

	/**
	 * @description Busca todos los proyectos con estatus activo
	 * @returns Observable<Project[]>
	 */
	findAallActiveProjects(): Observable<Project[]> {
		const url: string = `${this._baseUrl}/projects/get_active_projects`;
		return this.httpClient.get<Project[]>(url);
	}

	/**
	 * @description Busca todos los proyectos con estatus inactivo
	 * @returns Observable<Project[]>
	 */
	findInactiveProjects(): Observable<Project[]> {
		const url: string = `${this._baseUrl}/projects/get_all_projects/Inactivo`;
		return this.httpClient.get<Project[]>(url);
	}
}
