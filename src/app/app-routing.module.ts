import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './shared/guards/validate-token.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () =>
			import('./core/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'layout',
		canActivate: [ValidateTokenGuard],
		loadChildren: () =>
			import('./core/protected/protected.module').then(
				(m) => m.ProtectedModule
			),
	},
	{
		path: '**',
		redirectTo: 'auth',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
