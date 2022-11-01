import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { ValidateRoleGuard } from 'src/app/shared/guards/validate-role.guard';
import { ValidateTokenGuard } from 'src/app/shared/guards/validate-token.guard';

import { ProtectedComponent } from './protected.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},

	{
		path: '',
		component: ProtectedComponent,
		canActivateChild: [ValidateTokenGuard],
		children: [
			{
				path: 'home',
				canActivate: [ValidateRoleGuard],
				data: { roles: ACCESS_ROLES.home },
				loadChildren: () =>
					import('./pages/home/home.module').then(
						(m) => m.HomeModule
					),
			},
			{
				path: 'students',
				canActivate: [ValidateRoleGuard],
				data: { roles: ACCESS_ROLES.students },
				loadChildren: () =>
					import('./pages/students/students.module').then(
						(m) => m.StudentsModule
					),
			},
			{
				path: 'projects',
				loadChildren: () =>
					import('./pages/projects/projects.module').then(
						(m) => m.ProjectsModule
					),
			},
			/*{
				path: 'documents',
				loadChildren: () =>
					import('./pages/documents/documents.module').then(
						(m) => m.DocumentsModule
					),
			},*/
			{
				path: 'tasks',
				canActivate: [ValidateRoleGuard],
				data: { roles: ACCESS_ROLES.tasks },
				loadChildren: () =>
					import('./pages/tasks/tasks.module').then(
						(m) => m.TasksModule
					),
			},
			{
				path: 'tutors',
				canActivate: [ValidateRoleGuard],
				data: { roles: ACCESS_ROLES.tutors },
				loadChildren: () =>
					import('./pages/tutors/tutors.module').then(
						(m) => m.TutorsModule
					),
			},
			{
				path: 'profile',
				loadChildren: () =>
					import('./pages/profile/profile.module').then(
						(m) => m.ProfileModule
					),
			},
			{
				path: '404-notFound',
				loadChildren: () =>
					import('./pages/not-found/not-found.module').then(
						(m) => m.NotFoundModule
					),
			},
			{
				path: '**',
				redirectTo: 'home',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProtectedRoutingModule {}
