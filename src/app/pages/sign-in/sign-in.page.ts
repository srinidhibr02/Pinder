import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: any;
  phoneNumber: any;
  otpSent: boolean = false;
  otp = null;
  //@ts-ignore
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  //@ts-ignore
  countTimeout: number;

  constructor(
    public fireAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toaster: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user ? user : null;
    });
  }

  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() {
  }

  async sendOtp() {
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        "size": "invisible",
      });

    this.fireAuth.signInWithPhoneNumber("+91" + this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.otpSent = true;
        loading.dismiss();
        this.presentToast('OTP Sent', 'success');
      }).catch(error => {
        loading.dismiss();
        this.recaptchaVerifier.clear();
        this.presentToast(error.message, 'danger');
        console.log(error);
      });
    this.countTimeout = 30
    const myInterval = setInterval(() => {
      this.countTimeout -= 1;
      if (this.countTimeout == 0) {
        clearInterval(myInterval);
      }
    }, 1000)
  }

  async signIn() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.confirmationResult.confirm(this.otp)
      .then((user: any) => {
        loading.dismiss();
        this.presentToast('Successfully Authenticated', 'success');
        this.user = user;
        this.navCtrl.navigateForward('/home')
      })
      .catch((error: any) => {
        loading.dismiss();
        this.presentToast(error.message, 'danger');
        console.log(error.message);
      });
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
