import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from 'src/app/shared/interceptors/interceptor.service';


import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [ProtectedComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
	],
	imports: [CommonModule, LayoutModule, SharedModule, ProtectedRoutingModule],
})
export class ProtectedModule {}
