import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Plugins } from '@capacitor/core';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
const { App } = Plugins;

const ionicConfig = isPlatform('hybrid')
  ? {
      rippleEffect: false,
      mode: 'md' as const
    }
  : {
      rippleEffect: false,
      mode: 'md' as const
    };

IonicModule.forRoot(ionicConfig);

document.addEventListener('backbutton', () => {
  if (isPlatform('hybrid')) {
    App["exitApp"]();
  }
});
//
