import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraduatesRoutingModule } from './graduates-routing.module';
import { GraduatesComponent } from './graduates.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
	declarations: [GraduatesComponent],
	imports: [
		CommonModule,
		GraduatesRoutingModule,
		MaterialModule,
		SharedModule,
	],
})
export class GraduatesModule {}
