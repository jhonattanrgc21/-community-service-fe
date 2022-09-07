import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';

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
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return next.handle(newReq);
	}
}
