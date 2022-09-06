import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsResolver } from './resolvers/estudents.resolver';
import { StudentsComponent } from './students.component';

const routes: Routes = [
	{
		path: '',
		component: StudentsComponent,
		resolve: { students: StudentsResolver },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StudentsRoutingModule {}
