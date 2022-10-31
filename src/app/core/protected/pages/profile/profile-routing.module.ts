import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_ROLES } from 'src/app/shared/constants/constants';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent, data: {roles: ACCESS_ROLES.profile} }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
