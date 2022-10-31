import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../core/auth/services/auth.service';
import { HomeService } from '../core/protected/pages/home/services/home.service';
import { GeneralService } from '../core/protected/services/general.service';
import { ROUTES } from './constants/constants';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
	fullName!: string;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authService: AuthService,
		private generalServices: GeneralService,
		private homeService: HomeService,
		private router: Router
	) {}

	get isStudent(): boolean {
		return this.authService.isStudent;
	}

	get isTutor(): boolean {
		return this.authService.isTutor;
	}

	get isCoordinator(): boolean {
		return this.authService.isCoordinator;
	}

	ngOnInit(): void {
		const identification = this.authService.user.identification
			? this.authService.user.identification
			: '';
		this.generalServices
			.findUserByIdentification(identification)
			.subscribe((res) => {
				this.fullName = res.first_name + ' ' + res.last_name;
			});

		this.homeService.getInfoProject().subscribe((res) => {
			this.authService.projectId = res.id;
		});
	}

	onGoProfile(): void {
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
