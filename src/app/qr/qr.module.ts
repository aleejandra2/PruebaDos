import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRPageRoutingModule } from './qr-routing.module';

import { QRPage } from './qr.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [QRPage],
  bootstrap: [QRPage],
})
export class QRPageModule {}
