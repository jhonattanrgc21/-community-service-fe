import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'home',
		loadChildren: () => import('./core/protected/protected.module').then(m => m.ProtectedModule)
	},
	{
		path: '**',
		redirectTo: 'auth',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
