import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { RegisteredProject } from '../interfaces/home.interface';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	private _baseUrl: string = environment.baseUrlProjects;

	constructor(
		private _authService: AuthService,
		private _httpClient: HttpClient,
		private _datePipe: DatePipe
	) {}

	getInfoProject(): Observable<RegisteredProject | any> {
		const url: string = `${this._baseUrl}/users/get_project_info_by_student`;
		return this._httpClient
			.post<RegisteredProject>(url, {
				identification:
					'V-26000012' /*this._authService.user.identification,*/,
			})
			.pipe(
				tap((res: RegisteredProject) => {
					res.date_start = this._datePipe.transform(
						res.date_start,
						'dd/MM/yyyy'
					)!;
					res.task_list.map((item) => {
						item.date_start = this._datePipe.transform(
							item.date_start,
							'dd/MM/yyyy'
						)!;

						item.date_end = this._datePipe.transform(
							item.date_end,
							'dd/MM/yyyy'
						)!;
					});
				}),
				map((res: RegisteredProject) => res),
				catchError((err) => of({}))
			);
	}
}
