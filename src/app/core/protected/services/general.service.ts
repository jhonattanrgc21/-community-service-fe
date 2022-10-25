import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	private _baseUrl: string = `${environment.baseUrlProjects}`;

	constructor(private _httpClient: HttpClient) {}

	findUserByIdentification(identification: string): Observable<any> {
		const url = `${this._baseUrl}/users/get_user`;
		return this._httpClient.post<any>(url, { identification });
	}

	editUser(user: any): Observable<boolean> {
		const url: string = `${this._baseUrl}/users/update_user`;
		return this._httpClient.put<boolean>(url, user).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}
}
