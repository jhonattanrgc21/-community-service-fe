import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/shared/constants/constants';
import { Project } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
	selector: 'app-inactive-projects',
	templateUrl: './inactive-projects.component.html',
	styleUrls: ['./inactive-projects.component.scss'],
})
export class InactiveProjectsComponent implements OnInit {
	inactiveProjects: Project[] = [];

	constructor(
		private _projectsService: ProjectService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.getInactiveProjects();
	}

	getInactiveProjects() {
		this._projectsService.findInactiveProjects().subscribe((response) => {
			this.inactiveProjects = response;
		});
	}

	detailsProject(id: number): void {
		this._router.navigate([ROUTES.inactiveProjectDetails, id]);
	}
}
