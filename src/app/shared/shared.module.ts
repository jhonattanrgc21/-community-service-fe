import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedComponent } from './shared.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
@NgModule({
	declarations: [
		SharedComponent,
		DynamicTableComponent,
		ProjectCardComponent,
	],
	exports: [SharedComponent, DynamicTableComponent, ProjectCardComponent],
	imports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
