import { Router } from '@angular/router';

import { Injectable, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import 'firebase/auth';
import { environment } from '../../environments/environment';
import { RecaptchaVerifier } from 'firebase/auth';
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
    public fireAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toaster: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public router: Router,
    private ngZone: NgZone
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        //User Signed In
        this.user = user;
        this.navCtrl.navigateForward(['/tabs']);
      } else {
        //User Not Signed In
        this.router.navigate(['/sign-in']);
      }
    })
  }

  ngOnInit() { }

  //Phone Authentication
  //Send OTP to phone number
  async sendOTP(phoneNumber: string, recaptcha: RecaptchaVerifier) {
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.fireAuth.signInWithPhoneNumber("+91" + phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        loading.dismiss();
        this.presentToast('OTP Sent', 'success');
      })
      .catch(error => {
        loading.dismiss();
        this.presentToast(error.message, 'danger');
      });
  }

  //Congirm OTP & Authenticate
  async signIn(otp: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.confirmationResult.confirm(otp)
      .then((user: any) => {
        loading.dismiss();
        this.presentToast('Successfully Authenticated', 'success');
        this.user = user;
      })
      .catch((error: any) => {
        loading.dismiss();
        this.presentToast(error.message, 'danger');
        console.log(error.message);
      });
  }

  //Authenticate with Google
  async googleLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'please wait...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  //Log out
  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'please wait...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.fireAuth.signOut().then(() => {
      loading.dismiss();
      this.presentToast('Logged out', 'danger');
      this.ngZone.run(()=>{
        this.router.navigate(['/sign-in']);
      })
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
