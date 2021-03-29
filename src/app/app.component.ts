import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, AppState} from '@capacitor/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


import { AuthService } from './auth/auth.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // private authSub: Subscription;
  // private previousAuthState = false;

  // constructor(
  //   private platform: Platform,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.initializeApp();
  // }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     if (Capacitor.isPluginAvailable('SplashScreen')) {
  //       Plugins.SplashScreen.hide();
  //     }
  //   });
  // }

  // ngOnInit() {
  //   this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
  //     if (!isAuth && this.previousAuthState !== isAuth) {
  //       this.router.navigateByUrl('/auth');
  //     }
  //     this.previousAuthState = isAuth;
  //   });
  //   Plugins.App.addListener(
  //     'appStateChange',
  //     this.checkAuthOnResume.bind(this)
  //   );
  // }

  // onLogout() {
  //   this.authService.logout();
  // }


  // ngOnDestroy() {
  //   if (this.authSub) {
  //     this.authSub.unsubscribe();
  //   }
  //   // Plugins.App.removeListener('appStateChange', this.checkAuthOnResume);
  // }

  // private checkAuthOnResume(state: AppState) {
  //   if (state.isActive) {
  //     this.authService
  //       .autoLogin()
  //       .pipe(take(1))
  //       .subscribe(success => {
  //         if (!success) {
  //           this.onLogout();
  //         }
  //       });
  //   }
  // }





  private authSub: Subscription;
   private previousAuthState = false;

  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor(

    private authService: AuthService,
  
  
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
  ) {
    this.initializeApp();
  }


  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
    Plugins.App.addListener(
      'appStateChange',
      this.checkAuthOnResume.bind(this)
    );
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
  }


  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     if (Capacitor.isPluginAvailable('SplashScreen')) {
  //       Plugins.SplashScreen.hide();
  //     }
  //   });
  // }


  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    // Plugins.App.removeListener('appStateChange', this.checkAuthOnResume);
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    menuController.toggle();
  }
}



