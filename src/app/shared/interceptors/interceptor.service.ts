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
				access_token:
					'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHVyYW4iLCJyb2xlcyI6IlJPTEVfR09EIiwiZXhwIjoxNjYxOTYyODQ2LCJpYXQiOjE2NjE5NTcwODZ9.qGeESQPLr64BzFrNYXmppSIXmUVADFbiA4niJZf38SkHGQzcalmHp2C44971G2dnpTRO3qcuitaVeab2p8YWEw',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return next.handle(newReq);
	}
}
