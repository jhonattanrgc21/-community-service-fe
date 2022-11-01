import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
	constructor(private _spinnerService: SpinnerService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this._spinnerService.show();
		const newReq = req.clone({
			setHeaders: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
				'access-token': '3d14ce20-9c09-46a1-bc6a-a226b08b227b',
				Accept: 'application/json',
			},
		});
		return next.handle(newReq).pipe(
			finalize(() => this._spinnerService.hide())
		);
	}
}
