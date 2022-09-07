import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsResolve } from './resolvers/tutors.resolver';
import { TutorsComponent } from './tutors.component';

const routes: Routes = [
	{
		path: '', component: TutorsComponent, resolve: {tutors: TutorsResolve}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TutorsRoutingModule {}
