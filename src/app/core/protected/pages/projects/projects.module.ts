import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ActiveProjectsComponent } from './pages/active-projects/active-projects.component';
import { InactiveProjectsComponent } from './pages/inactive-projects/inactive-projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    ActiveProjectsComponent,
    InactiveProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule
  ]
})
export class ProjectsModule { }