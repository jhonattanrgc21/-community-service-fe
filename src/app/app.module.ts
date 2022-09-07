import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProtectedModule } from './core/protected/protected.module';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatNativeDateModule,
		MaterialModule,
		SharedModule,
		AuthModule,
		ProtectedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
