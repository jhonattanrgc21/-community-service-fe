import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../core/auth/services/auth.service';
import { ROUTES } from './constants/constants';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styleUrls: ['./shared.component.scss'],
})
export class SharedComponent {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authService: AuthService,
		private router: Router
	) { }

	onGoProfile(): void{
		this.router.navigateByUrl(ROUTES.profile);
	}

	onLogout() {
		this.authService.logout().subscribe((ok) => {
			if (ok == true) {
				this.router.navigateByUrl(ROUTES.login);
			} else {
				Swal.fire('Error', ok, 'error');
			}
		});
	}
}
