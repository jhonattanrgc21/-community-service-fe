import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ROUTES } from 'src/app/shared/constants/constants';

import { Project } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
	selector: 'app-active-projects',
	templateUrl: './active-projects.component.html',
	styleUrls: ['./active-projects.component.scss'],
})
export class ActiveProjectsComponent implements OnInit {
	activeProjects: Project[] = [];

	constructor(
		private _projectsService: ProjectService,
		private _router: Router,
		private _authService: AuthService
	) {}

	get isStudent(): boolean {
		return this._authService.isStudent;
	}

	get isTutor(): boolean {
		return this._authService.isTutor;
	}

	get isCoordinator(): boolean {
		return this._authService.isCoordinator;
	}

	ngOnInit(): void {
		this.getActiveProjects();
	}

	getActiveProjects() {
		this._projectsService.findAllActiveProjects().subscribe((response) => {
			this.activeProjects = response;
		});
	}

	detailsProject(id: number): void {
		this._router.navigate([ROUTES.activeProjectDetails, id]);
	}

	goToNewProject(): void {
		this._router.navigateByUrl(ROUTES.newProjects);
	}
}
