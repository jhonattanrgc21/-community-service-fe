import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsComponent } from './tutors.component';


@NgModule({
  declarations: [
    TutorsComponent
  ],
  imports: [
    CommonModule,
    TutorsRoutingModule
  ]
})
export class TutorsModule { }
