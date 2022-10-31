import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { ActiveProjectsComponent } from './pages/active-projects/active-projects.component';
import { InactiveProjectsComponent } from './pages/inactive-projects/inactive-projects.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

const routes: Routes = [
	{
		path: 'actives',
		data: { roles: ACCESS_ROLES.activeProjects },
		children: [
			{ path: '', component: ActiveProjectsComponent },
			{ path: ':id', component: ProjectDetailsComponent },
		],
	},
	{
		path: 'inactives',
		data: { roles: ACCESS_ROLES.inactiveProjects },
		children: [
			{ path: '', component: InactiveProjectsComponent },
			{ path: ':id', component: ProjectDetailsComponent },
		],
	},
	{
		path: 'new-project',
		component: NewProjectComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
