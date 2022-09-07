import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin, AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string = environment.baseUrlAuth;
	private _user!: User;

	constructor(private httpClient: HttpClient) {}

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
		const url: string = `${this.baseUrl}/login`;

		return this.httpClient.post<AuthResponse>(url, authLogin).pipe(
			// Actualiza los datos del usuario que vienen del backend
			tap((res: AuthResponse) => {
				if (res.ok) {
					// Agregando datos al localStorage
					localStorage.setItem('token', res.token!);
					localStorage.setItem('role', res.role!);
					localStorage.setItem('name', res.name!);
					localStorage.setItem(
						'document',
						res.identification_document!
					);
					this._user = {
						name: res.name!,
						uuid: res.uuid!,
						identification_document: res.identification_document!,
						token: res.token!,
						role: res.role!,
					};
				}
			}),

			// Devuelve true si el usuario esta registrado
			map((res: AuthResponse) => res.ok),

			// Devuelve un false si el usuario no esta registrado
			catchError((err) => of(err.error.message))
		);
	}

	logout(): Observable<any> {
		const url: string = `${this.baseUrl}/logout`;
		return this.httpClient.post<any>(url, {}).pipe(
			// Actualiza los datos del usuario que vienen del backend
			tap((res) => {
				if (res.ok) {
					// Elimino datos al localStorage
					localStorage.clear();
					this._user = {};
				}
			}),

			// Devuelve true si todo salio bien
			map((res) => res.ok),

			// Devuelve un el mensaje de error para la alerta en caso contrario
			catchError((err) => of(err.error.message))
		);
	}

	validateToken(): Observable<boolean> {
		// TODO: llamar al endpoint correcto para hacer el refresh-token
		const url: string = `${this.baseUrl}/refresh-token`;
		return this.httpClient.get<AuthResponse>(url).pipe(
			map((res: AuthResponse) => {
				// Agregando datos al localStorage
				localStorage.setItem('token', res.token!);
				localStorage.setItem('role', res.role!);
				localStorage.setItem('name', res.name!);
				localStorage.setItem('document', res.identification_document!);
				this._user = {
					name: res.name!,
					uuid: res.uuid!,
					identification_document: res.identification_document!,
					token: res.token!,
					role: res.role!,
				};
				return res.ok!;
			}),
			catchError((err) => of(false))
		);
	}
}
