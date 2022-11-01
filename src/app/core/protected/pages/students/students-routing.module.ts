import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { ValidateRoleGuard } from 'src/app/shared/guards/validate-role.guard';
import { NewStudentComponent } from './pages/new-student/new-student.component';
import { StudentsResolver } from './resolvers/estudents.resolver';
import { StudentsComponent } from './students.component';

const routes: Routes = [
	{
		path: '',
		component: StudentsComponent,
		resolve: { students: StudentsResolver },
	},
	{
		path: 'new-student',
		canActivate: [ValidateRoleGuard],
		data: { roles: ACCESS_ROLES.newStudent },
		component: NewStudentComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StudentsRoutingModule {}
