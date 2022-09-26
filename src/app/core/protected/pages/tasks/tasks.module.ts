import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [TasksComponent, NewTaskComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule,
		TasksRoutingModule,
	],
})
export class TasksModule {}
