import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanActivateChild,
	CanLoad,
	Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class ValidateTokenGuard
	implements CanActivate, CanLoad, CanActivateChild
{
	constructor(private roter: Router, private authService: AuthService) {}

	canActivate(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl('/auth');
				}
			})
		);
	}

	canLoad(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl('/auth');
				}
			})
		);
	}

	canActivateChild(): Observable<boolean> | boolean {
		return this.authService.validateToken().pipe(
			tap((valid: boolean) => {
				if (!valid) {
					this.roter.navigateByUrl('/auth');
				}
			})
		);
	}
}
