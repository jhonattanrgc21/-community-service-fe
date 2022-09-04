import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
	declarations: [StudentsComponent],
	imports: [
		CommonModule,
		MaterialModule,
		SharedModule,
		StudentsRoutingModule,
		MaterialModule,
	],
})
export class StudentsModule {}
