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
	constructor(private httpClient: HttpClient) {}

	getActiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/Activo`;
		return this.httpClient.get<Student[]>(url);
	}

	getInactiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/Inactivo`;
		return this.httpClient.get<Student[]>(url);
	}

	getAssignedStudents(): Observable<AssignedStudent[]> {
		const url: string = `${this.baseUrl}/Asignado`;
		return this.httpClient.get<AssignedStudent[]>(url);
	}

	getUnassignedStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/No-asignado`;
		return this.httpClient.get<Student[]>(url);
	}

	getApprovedStudents(): Observable<ApprovedStudent[]> {
		const url: string = `${this.baseUrl}/Aprobado`;
		return this.httpClient.get<ApprovedStudent[]>(url);
	}
}
