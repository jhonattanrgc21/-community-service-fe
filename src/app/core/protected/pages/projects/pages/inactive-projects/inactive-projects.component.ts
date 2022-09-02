import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-inactive-projects',
  templateUrl: './inactive-projects.component.html',
  styleUrls: ['./inactive-projects.component.scss']
})
export class InactiveProjectsComponent implements OnInit {

  projects?: Project[] = []; 

  constructor(private projectsService: ProjectService) { }

  ngOnInit(): void {
    this.getInactiveProjects();
  }

  getInactiveProjects() {
		this.projectsService.findInactiveProjects().subscribe(response => {
			this.projects = response;
			console.table(response);
		})
	}

}
