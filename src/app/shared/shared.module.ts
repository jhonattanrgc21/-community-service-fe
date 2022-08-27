import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedComponent } from './shared.component';


@NgModule({
	declarations: [DashboardComponent, SharedComponent],
	exports: [SharedComponent],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule
	]
})
export class SharedModule { }
