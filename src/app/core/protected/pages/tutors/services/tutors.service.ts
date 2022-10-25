import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../../../interfaces/users.interface';

import { Tutor } from '../interfaces/tutors.interface';


@Injectable({
	providedIn: 'root',
})
export class TutorsService {
	private _baseUrl: string = environment.baseUrlProjects;

	constructor(private httpClient: HttpClient) {}

	/**
	 * @description Busca todos los tutores registrados
	 * @returns Observable<Tutor[]>
	 */
	findAllTutors(): Observable<Tutor[]> {
		const url: string = `${this._baseUrl}/users/get_tutors`;
		return this.httpClient.get<Tutor[]>(url);
	}

	createTutor(user: NewUser): Observable<boolean> {
		const url: string = `${this._baseUrl}/users/create_tutor`;
		return this.httpClient.post<boolean>(url, user).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	createTutors(users: NewUser[]) {
		const url: string = `${this._baseUrl}/users/create_tutors`;
		return this.httpClient.post<boolean>(url, users).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}
}
