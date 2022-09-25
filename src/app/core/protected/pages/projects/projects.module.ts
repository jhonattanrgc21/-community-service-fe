import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ActiveProjectsComponent } from './pages/active-projects/active-projects.component';
import { InactiveProjectsComponent } from './pages/inactive-projects/inactive-projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		ActiveProjectsComponent,
		InactiveProjectsComponent,
		ProjectDetailsComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		ProjectsRoutingModule,
		MaterialModule,
	],
})
export class ProjectsModule {}
