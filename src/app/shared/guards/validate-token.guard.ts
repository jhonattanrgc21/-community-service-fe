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
import { HomeService } from 'src/app/core/protected/pages/home/services/home.service';
import { ROUTES } from '../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ValidateTokenGuard
	implements CanActivate, CanLoad, CanActivateChild
{
	constructor(
		private router: Router,
		private authService: AuthService,
		private homeService: HomeService
	) {}
	canActivateChild(
		route: ActivatedRouteSnapshot
	): Observable<boolean> | boolean | UrlTree {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.router.navigateByUrl(ROUTES.login);
				} else {
					this.homeService.getInfoProject().subscribe((res: any) => {
						this.authService.projectId = res.id;
					});
				}
			})
		);
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.router.navigateByUrl(ROUTES.login);
				} else {
					this.homeService.getInfoProject().subscribe((res: any) => {
						this.authService.projectId = res.id;
					});
				}
			})
		);
	}

	canLoad(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.router.navigateByUrl(ROUTES.login);
				} else {
					this.homeService.getInfoProject().subscribe((res: any) => {
						this.authService.projectId = res.id;
					});
				}
			})
		);
	}
}
