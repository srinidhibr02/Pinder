import { User } from './../models/user';
import { Injectable, NgZone } from '@angular/core';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo!:any;

  constructor(
    private firestore: AngularFirestore,
    private ngFireAuth: AngularFireAuth,
    private toaster: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private httpClient: HttpClient,
    public _ngZone: NgZone
  ) {}

  //login with email/password
  async signIn({ email, password }: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.ngFireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if (!user.user?.emailVerified) {
        loading.dismiss();
        this.presentAlert(
          'Verify your Email',
          '',
          'Click the link provided in your email before you can login and enter the world of pet lovers.',
          ['OK']
        );
        this.ngFireAuth.signOut();
      } else {
        loading.dismiss();
        this.toast('login successful', 'success');
        this.router.navigate(['/home'])
      }
    }).catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger')
    }).catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
  }
  //Register with Email, password & Phone number
  async register({ email, password, phone }: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Creating Account..',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();
    await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
      .then((userFull) => {
        loading.dismiss();
        console.log(userFull);
        const linkId = userFull.user?.uid;
        const actionCodeSettings = {
          url: 'https://pinder-91a59.web.app/finishSignUp?linkId=' + linkId,
          handleCodeInApp: true
        };
        this.ngFireAuth.sendSignInLinkToEmail(email, actionCodeSettings)
        this.toast(`Successfully registered`, 'success')
        this.router.navigate(['/login'])
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
  }

  async signOut() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.ngFireAuth.signOut()
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/login']);
      })
  }

  //Google Authentication removing everything else
  async GoogleAuth() {
  
  }
  SetUserData(user: any) {
    const userData: User = {
      email: user.email,
      emailVerified: user.emailVerified,
      phone: (user?.phone === undefined) ? null : user.phone,
      phoneVerified: (user?.phoneVerified === undefined) ? null : user.phoneVerified,
      password: (user?.password === undefined) ? null : user.password,
      createdAt: new Date()
    }
    this.firestore.collection('users').add(userData);
  }

  async toast(message: string, status: string) {
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(header: string = 'Alert', subHeader: string = '', message: string, buttons: Array<string> = ['OK']) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
    });
    alert.present();
  }
}
