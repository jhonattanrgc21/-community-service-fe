import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {NgxSpinnerService } from 'ngx-spinner'

@Injectable({
	providedIn: 'root',
})
export class SpinnerService {
	//isLoading$ = new Subject<boolean>();

	constructor(private _spinnerService: NgxSpinnerService) {}

	show(): void {
		this._spinnerService.show();
		//this.isLoading$.next(true);
	}

	hide(): void {
		this._spinnerService.hide();
		//this.isLoading$.next(false);
	}
}
