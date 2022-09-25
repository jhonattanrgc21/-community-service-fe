import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ROUTES } from '../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ValidateTokenGuard
	implements CanActivate, CanLoad
{
	constructor(private roter: Router, private authService: AuthService) {}

	canActivate(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl(ROUTES.login);
				}
			})
		);
	}

	canLoad(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl(ROUTES.login);
				}
			})
		);
	}
}
