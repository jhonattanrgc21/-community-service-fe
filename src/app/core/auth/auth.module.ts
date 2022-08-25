import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		ForgotPasswordComponent,
		ChangePasswordComponent
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class AuthModule { }
