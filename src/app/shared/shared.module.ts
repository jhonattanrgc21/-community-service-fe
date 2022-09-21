import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { SharedComponent } from './shared.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { DynamicRegisterComponent } from './components/dynamic-register/dynamic-register.component';
import { PaginatePipe } from './pipes/paginate.pipe';
@NgModule({
	declarations: [
		SharedComponent,
		DynamicTableComponent,
		ProjectCardComponent,
		DynamicRegisterComponent,
		PaginatePipe,
	],
	exports: [
		SharedComponent,
		DynamicTableComponent,
		ProjectCardComponent,
		DynamicRegisterComponent,
		PaginatePipe,
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
