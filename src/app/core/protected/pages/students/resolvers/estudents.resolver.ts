import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../Interfaces/students.interface';
import { StudentsService } from '../services/students.service';

@Injectable({
	providedIn: 'root',
})
export class StudentsResolver implements Resolve<any> {
	/**
	 * Constructor
	 */
	constructor(private _studentsService: StudentsService) {}

	/**
	 * Resolver
	 *
	 * @param route
	 * @param state
	 */
	resolve(): Observable<Student[]> {
		return this._studentsService.findActiveStudents();
	}
}
