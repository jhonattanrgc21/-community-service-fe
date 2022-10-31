import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { TasksComponent } from './tasks.component';

const routes: Routes = [{ path: '', component: TasksComponent, data: {roles: ACCESS_ROLES.tasks} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
