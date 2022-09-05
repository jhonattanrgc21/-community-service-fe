import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [TasksComponent],
	imports: [CommonModule, MaterialModule, SharedModule, TasksRoutingModule],
})
export class TasksModule {}
