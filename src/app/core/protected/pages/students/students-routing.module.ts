import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
		component: NewStudentComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StudentsRoutingModule {}
