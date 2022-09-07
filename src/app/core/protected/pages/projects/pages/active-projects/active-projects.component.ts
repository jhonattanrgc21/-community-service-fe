import { Component, OnInit } from '@angular/core';

import { Project } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
	selector: 'app-active-projects',
	templateUrl: './active-projects.component.html',
	styleUrls: ['./active-projects.component.scss']
})
export class ActiveProjectsComponent implements OnInit {

	activeProjects: Project[] = [];

	constructor(private _projectsService: ProjectService) { }

	ngOnInit(): void {
		this.getActiveProjects();
	}

	getActiveProjects() {
		this._projectsService.findAllActiveProjects().subscribe(response => {
			this.activeProjects = response;
		})
	}
}
