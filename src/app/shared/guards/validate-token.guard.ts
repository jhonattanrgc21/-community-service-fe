import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	CanLoad,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ROUTES } from '../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ValidateTokenGuard
	implements CanActivate, CanLoad, CanActivateChild
{
	constructor(private roter: Router, private authService: AuthService) {}
	canActivateChild(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl(ROUTES.login);
				}
			})
		);
	}

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
