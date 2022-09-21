import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const newReq = req.clone({
			setHeaders: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
				access_token: '3d14ce20-9c09-46a1-bc6a-a226b08b227b',
				Accept: 'application/json',
			},
		});
		return next.handle(newReq);
	}
}
