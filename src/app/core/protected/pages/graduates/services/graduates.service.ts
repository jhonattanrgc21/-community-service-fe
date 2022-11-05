import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApprovedStudent } from '../../students/Interfaces/students.interface';

@Injectable({
	providedIn: 'root',
})
export class GraduatesService {
	private baseUrl: string = `${environment.baseUrlProjects}/users`;
	constructor(private _httpClient: HttpClient) {}

	findGraduateStudents(): Observable<ApprovedStudent[]> {
		const url: string = `${this.baseUrl}/get_students/Graduado`;
		return this._httpClient.get<ApprovedStudent[]>(url);
	}
}
