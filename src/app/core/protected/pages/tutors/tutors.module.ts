import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsComponent } from './tutors.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTutorComponent } from './pages/new-tutor/new-tutor.component';
import { EditTutorComponent } from './pages/edit-tutor/edit-tutor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [TutorsComponent, NewTutorComponent, EditTutorComponent],
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule,
		TutorsRoutingModule,
		ReactiveFormsModule,
	],
})
export class TutorsModule {}
