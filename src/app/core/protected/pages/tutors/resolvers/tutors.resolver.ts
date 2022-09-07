import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Tutor } from '../interfaces/tutors.interface';
import { TutorsService } from '../services/tutors.service';

@Injectable({
	providedIn: 'root',
})
export class TutorsResolve implements Resolve<any> {
	/**
	 * Constructor
	 */
	constructor(private _tutorsService: TutorsService) {}

	/**
	 * Resolver
	 *
	 * @param route
	 * @param state
	 */
	resolve(): Observable<Tutor[]> {
		return this._tutorsService.findAllTutors();
	}
}
