import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from '../core/auth/services/auth.service';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styleUrls: ['./shared.component.scss']
})
export class SharedComponent {

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) { }

	onLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/auth')
	}
}
