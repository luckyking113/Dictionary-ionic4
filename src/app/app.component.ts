import { Component, OnInit, OnDestroy} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DicdatabaseService } from './services/dicdatabase.service';

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
      url: '/favorite',
      icon: 'star-half'
    },
    {
      title: 'Settings',
      url: '',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '',
      icon: 'information-circle-outline'
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private DicData: DicdatabaseService,
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
