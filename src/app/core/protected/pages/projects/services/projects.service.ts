import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../../../interfaces/projects.interface';


@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private _baseUrl: string = environment.baseUrlLayout;

	constructor(private httpClient: HttpClient) { }

	/**
	 * @description Busca todos los proyectos con estatus activo
	 * @returns Observable<Project[]>
	 */
	findAallActiveProjects(): Observable<Project[]> {
		const url: string = `${this._baseUrl}/projects/get_active_projects`;
		const headers = new HttpHeaders().set('Accept', 'application/json').set('access_token', 'token');
		return this.httpClient.get<Project[]>(url, { headers });
	}
}
