import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, SharedModule, MaterialModule, ProfileRoutingModule, ReactiveFormsModule],
})
export class ProfileModule {}
