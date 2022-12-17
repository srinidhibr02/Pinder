import { Router } from '@angular/router';

import { Injectable, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import 'firebase/auth';
import { environment } from '../../environments/environment';
firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user: any;
  //@ts-ignore
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  //@ts-ignore
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(
    private toaster: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public router: Router,
  ) {}

  ngOnInit() {}
  
  //Phone OTP Authentication
  async sendOTP(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((data: any) => {
        loading.dismiss();
        this.confirmationResult = data;
        this.presentToast('OTP Sent', 'success');
      })
      .catch(error => {
        loading.dismiss();
        console.log(error);
        this.presentToast(error.message, 'danger');
      });
  }

  //SignIn using Phone number OTP verification
  async signInOTPverification(OTP: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Signing In',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.confirmationResult.confirm(OTP)
      .then((user: any) => {
        loading.dismiss();
        this.user = user;
        this.presentToast('Sign-in Successful', 'success');
        this.router.navigate(['/tabs']);
      })
      .catch(error => {
        loading.dismiss();
        console.log(error);
        this.presentToast(error.message, 'danger');
      })
  }

  //Authenticate with Google
  async googleLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'please wait...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    loading.dismiss();
  }


  //Log out
  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'please wait...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    firebase.auth().signOut().then(() => {
      loading.dismiss();
      this.presentToast('Logged out', 'danger');
      this.router.navigate(['/sign-in']);
    })
  }

  async presentToast(message: string, status: string) {
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'middle',
      duration: 3000
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
