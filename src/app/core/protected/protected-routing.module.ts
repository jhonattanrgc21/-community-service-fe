import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';

const routes: Routes = [
	{
		path: '',
		component: ProtectedComponent,
		children: [
			{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
			{ path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },
			{ path: 'documents', loadChildren: () => import('./pages/documents/documents.module').then(m => m.DocumentsModule) },
			{ path: 'students', loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule) },
			{ path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
			{ path: 'tutors', loadChildren: () => import('./pages/tutors/tutors.module').then(m => m.TutorsModule) },
			{ path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
			{
				path: '**',
				redirectTo: 'home'
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProtectedRoutingModule { }
