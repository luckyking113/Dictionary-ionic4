import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Recent',
      url: '',
      icon: 'time'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'star-half'
    },
    {
      title: 'Settings',
      url: '/Settings',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '/Settings',
      icon: 'information-circle-outline'
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
