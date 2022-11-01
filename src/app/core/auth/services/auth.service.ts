import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthLogin, AuthResponse, User } from '../interfaces/auth.interface';
import { ChangePassowrd } from '../../protected/pages/profile/interfaces/profile.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string = environment.baseUrlAuth;
	private _user: User = {};

	constructor(private httpClient: HttpClient) {}

	/**
	 * @description Almacena los datos del usuario despues de iniciar sesión
	 * @returns User
	 */
	get user() {
		return { ...this._user };
	}

	set projectId(id: any) {
		this._user.projectId = id;
	}

	get role(): string{
		return this._user.role ? this._user.role : '';
	}

	get identification(): string{
		return this._user.identification ? this._user.identification : '';
	}

	get isTutor(): boolean {
		return this._user.role == 'tutor' ? true : false;
	}

	get isStudent(): boolean {
		return this._user.role == 'student' ? true : false;
	}

	get isCoordinator(): boolean {
		return this._user.role == 'coordinator' ? true : false;
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
					localStorage.setItem('document', res.identification!);
					this._user = {
						uuid: res.uuid!,
						identification: res.identification!,
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
		const url: string = `${this.baseUrl}/refresh-token`;
		return this.httpClient.get<AuthResponse>(url).pipe(
			map((res: AuthResponse) => {
				// Agregando datos al localStorage
				localStorage.setItem('token', res.token!);
				localStorage.setItem('role', res.role!);
				localStorage.setItem('document', res.identification!);
				this._user = {
					uuid: res.uuid!,
					identification: res.identification!,
					token: res.token!,
					role: res.role!,
				};
				return res.ok!;
			}),
			catchError((err) => of(false))
		);
	}

	changePasswordProfile(changePassword: ChangePassowrd): Observable<boolean> {
		const url: string = `${this.baseUrl}/change-password`;
		return this.httpClient.put<boolean>(url, changePassword).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	forgotPassword(email: string) {
		const url: string = `${this.baseUrl}/forgot-password`;
		return this.httpClient.post<boolean>(url, { email }).pipe(
			map((res) => true),
			catchError((err) => of(false))
		);
	}

	resetPassword(token: string, changePassword: any): Observable<boolean> {
		const url: string = `${this.baseUrl}/reset-password`;
		let headers: HttpHeaders = new HttpHeaders().set(
			'Authorization',
			token
		);
		return this.httpClient
			.put<boolean>(url, changePassword, { headers })
			.pipe(
				map((res) => true),
				catchError((err) => of(false))
			);
	}
}
