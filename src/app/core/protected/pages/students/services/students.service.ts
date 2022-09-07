import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApprovedStudent, AssignedStudent, Student } from '../Interfaces/students.interface';

@Injectable({
	providedIn: 'root',
})
export class StudentsService {
	private baseUrl: string = `${environment.baseUrlProjects}/users/get_students`;
	constructor(private _httpClient: HttpClient) {}

	findActiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/Activo`;
		return this._httpClient.get<Student[]>(url);
	}

	findInactiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/Inactivo`;
		return this._httpClient.get<Student[]>(url);
	}

	findAssignedStudents(): Observable<AssignedStudent[]> {
		const url: string = `${this.baseUrl}/Asignado`;
		return this._httpClient.get<AssignedStudent[]>(url);
	}

	findUnassignedStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/No-asignado`;
		return this._httpClient.get<Student[]>(url);
	}

	findApprovedStudents(): Observable<ApprovedStudent[]> {
		const url: string = `${this.baseUrl}/Aprobado`;
		return this._httpClient.get<ApprovedStudent[]>(url);
	}
}
