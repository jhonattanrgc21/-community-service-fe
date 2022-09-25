import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveProjectsComponent } from './pages/active-projects/active-projects.component';
import { InactiveProjectsComponent } from './pages/inactive-projects/inactive-projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

const routes: Routes = [
	{
		path: 'actives',
		children: [
			{ path: '', component: ActiveProjectsComponent },
			{ path: ':id', component: ProjectDetailsComponent },
		],
	},
	{
		path: 'inactives',
		children: [
			{ path: '', component: InactiveProjectsComponent },
			{ path: ':id', component: ProjectDetailsComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
