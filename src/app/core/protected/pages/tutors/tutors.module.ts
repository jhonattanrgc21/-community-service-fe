import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsComponent } from './tutors.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [TutorsComponent],
	imports: [CommonModule, MaterialModule, SharedModule, TutorsRoutingModule],
})
export class TutorsModule {}
