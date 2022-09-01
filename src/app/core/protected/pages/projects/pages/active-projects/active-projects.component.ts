import { Component, OnInit } from '@angular/core';

import { Project } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
	selector: 'app-active-projects',
	templateUrl: './active-projects.component.html',
	styleUrls: ['./active-projects.component.scss']
})
export class ActiveProjectsComponent implements OnInit {

	projects: any[] = [];

	constructor(private projectsService: ProjectService) { }

	ngOnInit(): void {
		this.getActiveProjects();
	}

	getActiveProjects() {
		this.projectsService.findAallActiveProjects().subscribe(response => {

			/*for(let item of response){
				this.projects.push({
					name: item.name!,
					description: item.description!,
					student_count: item.student_count!,
					date_start: item.date_start!
				})
				console.log(item);
			}*/

			this.projects = response;
			console.log(response);
			console.table(response);
		})
	}
}
