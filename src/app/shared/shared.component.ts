import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../core/auth/services/auth.service';

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
		this.router.navigateByUrl('/layout/profile');
	}

	onLogout() {
		this.authService.logout().subscribe((ok) => {
			if (ok == true) {
				this.router.navigateByUrl('/auth');
			} else {
				Swal.fire('Error', ok, 'error');
			}
		});
	}
}
