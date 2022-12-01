import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    private storage: Storage, 
    private router: Router,
    private navCtrl: NavController
    ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  proceed(){
    this.storage.set('ViewedOnboardingPage', true)
    this.navCtrl.navigateForward('/sign-in');
  }
  
}
