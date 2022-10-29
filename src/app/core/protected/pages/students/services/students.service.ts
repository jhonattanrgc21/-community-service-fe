import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeStatus, NewUser } from '../../../interfaces/users.interface';
import {
	ApprovedStudent,
	AssignedStudent,
	Student,
} from '../Interfaces/students.interface';

@Injectable({
	providedIn: 'root',
})
export class StudentsService {
	private baseUrl: string = `${environment.baseUrlProjects}/users`;
	constructor(private _httpClient: HttpClient) {}

	findActiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/get_students/Activo`;
		return this._httpClient.get<Student[]>(url);
	}

	findInactiveStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/get_students/Inactivo`;
		return this._httpClient.get<Student[]>(url);
	}

	findAssignedStudents(): Observable<AssignedStudent[]> {
		const url: string = `${this.baseUrl}/get_students/Asignado`;
		return this._httpClient.get<AssignedStudent[]>(url);
	}

	findUnassignedStudents(): Observable<Student[]> {
		const url: string = `${this.baseUrl}/get_students/No-asignado`;
		return this._httpClient.get<Student[]>(url);
	}

	findApprovedStudents(): Observable<ApprovedStudent[]> {
		const url: string = `${this.baseUrl}/get_students/Aprobado`;
		return this._httpClient.get<ApprovedStudent[]>(url);
	}

	updateStatusByIdentificationList(
		changeStatus: ChangeStatus
	): Observable<boolean> {
		const url: string = `${this.baseUrl}/update_students_status/${changeStatus.status}`;
		return this._httpClient
			.put<boolean>(url, { id_list: changeStatus.identifications })
			.pipe(
				map((res) => true),
				catchError((err) => of(false))
			);
	}

	createStudent(user: NewUser): Observable<boolean> {
		const url: string = `${this.baseUrl}/create_student`;
		return this._httpClient.post<boolean>(url, user).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	createStudents(users: NewUser[]) {
		const url: string = `${this.baseUrl}/create_students`;
		return this._httpClient.post<boolean>(url, users).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	exitProject(identification: string): Observable<boolean> {
		const url: string = `${this.baseUrl}/delete_student_project`;
		return this._httpClient.put<boolean>(url, {identification}).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}
}
