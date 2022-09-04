import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SharedComponent } from './shared.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

@NgModule({
	declarations: [SharedComponent, DynamicTableComponent],
	exports: [SharedComponent, DynamicTableComponent],
	imports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
