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

	constructor(private projectsService: ProjectService) { }

	ngOnInit(): void {
		this.getActiveProjects();
	}

	getActiveProjects() {
		this.projectsService.findAallActiveProjects().subscribe(response => {
			this.activeProjects = response;
		})
	}
}
