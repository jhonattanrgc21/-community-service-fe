import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ROUTES } from '../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ValidateRoleGuard implements CanActivate {
	constructor(private _router: Router, private _authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean | UrlTree {
		let access = false;
		const roles: string[] = route.data['roles'];
		if (
			roles != null &&
			roles.length > 0 &&
			roles.includes(this._authService.role)
		) {
			access = true;
		} else {
			if (this._authService.role != 'student') {
				return this._router.createUrlTree([ROUTES.students]);
			}
		}

		if (!access) {
			return this._router.createUrlTree([ROUTES.notFound]);
		}
		return true;
	}
}
