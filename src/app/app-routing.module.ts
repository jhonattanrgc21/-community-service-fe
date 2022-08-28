import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { ValidateTokenGuard } from './shared/guards/validate-token.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'layout',
		loadChildren: () => import('./core/protected/protected.module').then(m => m.ProtectedModule),
		/*canActivate: [ValidateTokenGuard],
		canLoad: [ValidateTokenGuard]*/
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
