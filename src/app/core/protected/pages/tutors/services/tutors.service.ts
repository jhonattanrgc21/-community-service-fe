import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
	findAllTutors(): Observable<Tutor[]>{
		const url: string = `${this._baseUrl}/users/get_tutors`;
		return this.httpClient.get<Tutor[]>(url);
	}
}
