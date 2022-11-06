import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
	NewProject,
	Project,
	ProjectDetails,
} from '../interfaces/projects.interface';

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

	onAddStudents(projectId: number, studentIds: any[]): Observable<boolean> {
		const url: string = `${this._baseUrl}/users/enroll_students_in_project/${projectId}`;
		return this._httpClient.post<boolean>(url, studentIds).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	createProject(project: NewProject): Observable<boolean> {
		const url: string = `${this._baseUrl}/projects/create_project`;
		return this._httpClient.post<boolean>(url, project).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	createProjects(projects: NewProject[]): Observable<any> {
		const url: string = `${this._baseUrl}/projects/create_projects`;
		return this._httpClient.post<any>(url, projects)
	}

	editProject(projectId: number, status: string): Observable<boolean> {
		const url: string = `${this._baseUrl}/projects/update_project_status/${projectId}/${status}`;
		return this._httpClient.put<boolean>(url, {}).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	exportTudentsByProject(ids: number[]): Observable<boolean>{
		const url: string = `${this._baseUrl}/users/delete_students_project`;
		return this._httpClient.put<boolean>(url, { id_list: ids }).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	};
}
