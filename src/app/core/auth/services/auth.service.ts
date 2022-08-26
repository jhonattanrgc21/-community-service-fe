import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin, AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private baseUrl: string = environment.baseUrl;
	private _user!: User;

	constructor(private httpClient: HttpClient) { }

	/**
	 * @description Almacena los datos del usuario despues de iniciar sesión
	 * @returns User
	 */
	get user() {
		return { ...this._user };
	}

	/**
	 * @description Hace una peticion al backend para iniciar sesión
	 * @param authLogin
	 * @returns Observable<any>
	 */
	login(authLogin: AuthLogin): Observable<any> {
		// TODO: llamar al endpoint correcto que hace el login
		const url: string = `${this.baseUrl}/`;

		return this.httpClient.post<AuthResponse>(url, authLogin)
			.pipe(
				// Actualiza los datos del usuario que vienen del backend
				tap(
					(res: AuthResponse) => {
						if (res.ok) {
							// Agregando datos al localStorage
							localStorage.setItem('token', res.token!)
							localStorage.setItem('role', res.role!);
							localStorage.setItem('name', res.name!);
							localStorage.setItem('document', res.document!);
							this._user = {
								name: res.name!,
								uuid: res.uuid!,
								document: res.document!
							}
						}
					}
				),

				// Devuelve true si el usuario esta registrado
				map((res: AuthResponse) => res.ok),

				// Devuelve un false si el usuario no esta registrado
				catchError(err => of(err.error.message))
			);
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('name');
		localStorage.removeItem('document');
	}

	validateToken(): Observable<boolean> {
		// TODO: llamar al endpoint correcto para hacer el refresh-token
		const url: string = `${this.baseUrl}/`;
		const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

		return this.httpClient.get<AuthResponse>(url, { headers }).pipe(
			map((res: AuthResponse) => {
				// Agregando datos al localStorage
				localStorage.setItem('token', res.token!)
				localStorage.setItem('role', res.role!);
				localStorage.setItem('name', res.name!);
				localStorage.setItem('document', res.document!);
				this._user = {
					name: res.name!,
					uuid: res.uuid!,
					document: res.document!
				}
				return res.ok!;
			}),
			catchError(err => of(false))
		);
	}
}
