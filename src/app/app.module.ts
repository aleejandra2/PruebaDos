import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Plugins, Capacitor } from '@capacitor/core';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

const { App } = Plugins;

let lastTimeBackPress = 0;
let timePeriodToExit = 2000;

document.addEventListener('backbutton', () => {
  const currentTime = new Date().getTime();
  if (isPlatform('hybrid') && isPlatform('android')) {
    if (currentTime - lastTimeBackPress < timePeriodToExit) {
      App['exitApp']();
    } else {
      lastTimeBackPress = currentTime;
    }
  }
});
