import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewStudentComponent } from './pages/new-student/new-student.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [StudentsComponent, NewStudentComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule,
		StudentsRoutingModule,
		MaterialModule,
	],
})
export class StudentsModule {}
