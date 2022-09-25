import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Task, TutorTask, TaskProject } from '../interfaces/tasks.iterface';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private _baseUrl: string = `${environment.baseUrlProjects}/tasks`;

	constructor(
		private _httpClient: HttpClient,
		private _authService: AuthService,
		private _datePipe: DatePipe
	) {}

	/**
	 * @returns Devuelve una lista de tareas correspondientes al estudiante que inicio sesion
	 */
	findAllTaskByStudent(): Observable<Task[]> {
		const url: string = `${this._baseUrl}/get_student_tasks`;
		return this._httpClient
			.post<Task[]>(url, {
				identification: this._authService.user.identification,
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
				map((res: Task[]) => res),
				catchError((err) => of([]))
			);
	}

	/**
	 * @returns Devuelve una lista de tareas tuteadas por el tutor que inicio sesion
	 */
	findAllTaskByTutor(): Observable<TutorTask[]> {
		const url: string = `${this._baseUrl}/get_tutor_tasks`;
		return this._httpClient
			.post<TutorTask[]>(url, {
				identification: this._authService.user.identification,
			})
			.pipe(
				tap((res: TutorTask[]) => {
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
				map((res: TutorTask[]) => res),
				catchError((err) => of([]))
			);
	}

	findAllTaskByProject(projectId: number): Observable<TaskProject[]> {
		const url: string = `${this._baseUrl}/get_project_tasks/${projectId}`;
		return this._httpClient.get<TaskProject[]>(url).pipe(
			tap((res: TaskProject[]) => {
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
			map((res: TaskProject[]) => res),
			catchError((err) => of([]))
		);
	}
}
