import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

import { HttpClientModule } from '@angular/common/http';

import { RegionesComponent } from '../component/regiones/regiones.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrarPage, RegionesComponent]
})
export class RegistrarPageModule {}
