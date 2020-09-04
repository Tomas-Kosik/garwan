import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './angular-material/material.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
