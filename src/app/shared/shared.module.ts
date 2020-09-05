import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './angular-material/material.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    LoaderComponent,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
