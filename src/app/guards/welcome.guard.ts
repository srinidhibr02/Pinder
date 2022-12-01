import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/Storage-angular';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate{

  constructor(
    private navCtrl:NavController,
    private storage:Storage
  ){
    this.storage.create();
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isViewed = await this.storage.get('ViewedOnboardingPage');
    if(isViewed){
      this.navCtrl.navigateForward('/sign-in');
    }
    return !isViewed;
  }
  
}
