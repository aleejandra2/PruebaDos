import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {

    if (this.platform.is('android') || this.platform.is('ios')) {
    } else {
      localStorage.clear();
    }
  }

  ngOnInit() {
    
    // this.reiniciarLocalStorage();
  }

  reiniciarLocalStorage() {
    localStorage.clear();
  }
  
}
