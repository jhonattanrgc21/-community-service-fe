import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
	declarations: [
		ProtectedComponent
	],
	imports: [
		CommonModule,
		LayoutModule,
		SharedModule,
		ProtectedRoutingModule
	]
})
export class ProtectedModule { }
