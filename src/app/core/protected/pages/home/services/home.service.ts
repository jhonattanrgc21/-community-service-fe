import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Task } from '../../tasks/interfaces/tasks.iterface'

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

	findCompletedTasks(): Observable<Task[]> {
		const url: string = `${this._baseUrl}/tasks/get_student_tasks`;
		return this._httpClient
			.post<Task[]>(url, {
				identification: this._authService.user.identification
			})
			.pipe(
				tap((res: Task[]) => {
					res.map((item) => {
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
				map(
					(res: Task[]) =>
						(res = res.filter(
							(item) => item.status == 'Completada'
						))
				),
				catchError((err) => of([]))
			);
	}
}
