import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../../students/Interfaces/students.interface';
import { Project, ProjectDetails } from '../interfaces/projects.interface';


@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private _baseUrl: string = environment.baseUrlProjects;

	constructor(private _httpClient: HttpClient) {}

	/**
	 * @description Busca todos los proyectos con estatus activo
	 * @returns Observable<Project[]>
	 */
	findAllActiveProjects(): Observable<Project[]> {
		const url: string = `${this._baseUrl}/projects/get_active_projects`;
		return this._httpClient.get<Project[]>(url);
	}

	/**
	 * @description Busca todos los proyectos con estatus inactivo
	 * @returns Observable<Project[]>
	 */
	findInactiveProjects(): Observable<Project[]> {
		const url: string = `${this._baseUrl}/projects/get_all_projects/by_status/Inactivo`;
		return this._httpClient.get<Project[]>(url);
	}

	/**
	 * @param id
	 * @description Busca el proyecto asociado al id que se le envia por parametro
	 * @returns Observable<Project>
	 */
	findProjectById(id: number): Observable<ProjectDetails> {
		const url: string = `${this._baseUrl}/projects/get_project/${id}`;
		return this._httpClient.get<ProjectDetails>(url);
	}

	findStudentsByProject(projectId: number): Observable<any[]> {
		const url: string = `${this._baseUrl}/projects/get_students/${projectId}`;
		return this._httpClient.get<any[]>(url);
	}

	findStudentsAprobbalByProject(projectId: number): Observable<any[]> {
		const url: string = `${this._baseUrl}/projects/get_students_to_approval/${projectId}`;
		return this._httpClient.get<any[]>(url);
	}
}
