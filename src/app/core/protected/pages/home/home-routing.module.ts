import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES} from 'src/app/shared/constants/constants';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, data: {roles: ACCESS_ROLES.home} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
