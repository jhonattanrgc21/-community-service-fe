import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { NewTutorComponent } from './pages/new-tutor/new-tutor.component';
import { TutorsResolve } from './resolvers/tutors.resolver';
import { TutorsComponent } from './tutors.component';

const routes: Routes = [
	{
		path: '',
		component: TutorsComponent,
		resolve: { tutors: TutorsResolve },
		data: { roles: ACCESS_ROLES.tutors },
	},
	{
		path: 'new-tutor',
		data: { roles: ACCESS_ROLES.tutors },
		component: NewTutorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TutorsRoutingModule {}
