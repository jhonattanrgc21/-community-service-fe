import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		HomeRoutingModule
	]
})
export class HomeModule { }
