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
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
	declarations: [
		SharedComponent,
		DynamicTableComponent,
		ProjectCardComponent,
		DynamicRegisterComponent,
		PaginatePipe,
		FilterPipe
	],
	exports: [
		SharedComponent,
		DynamicTableComponent,
		ProjectCardComponent,
		DynamicRegisterComponent,
		PaginatePipe,
		FilterPipe,
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
