import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveProjectsComponent } from './pages/active-projects/active-projects.component';
import { InactiveProjectsComponent } from './pages/inactive-projects/inactive-projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
	{ path: '', component: ProjectsComponent },
	{ path: 'actives', component: ActiveProjectsComponent },
	{ path: 'inactives', component: InactiveProjectsComponent },
	{ path: ':id', component: ProjectDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }
