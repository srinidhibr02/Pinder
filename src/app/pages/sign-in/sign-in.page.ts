import { AuthService } from './../../services/auth.service';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

firebase.initializeApp(environment.firebaseConfig);
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: any;
  otpSent: boolean = false;
  phoneNumber: string = '';
  otpEntered: string = ''
  //@ts-ignore
  timeLeft: number;
  //@ts-ignore
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  //@ts-ignore
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(
    private toaster: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private ngZone: NgZone,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ionViewDidEnter() {
    //Get Redirect Results 
    firebase.auth().getRedirectResult().then((result) => {
      console.log('HII people');
      if (result.credential) {
        console.log('Fucker Result Credentials are', result.credential);
        this.router.navigate(['/tabs']);
      }
    });

    //Generate Recaptcha after everything is loaded.
    (<HTMLElement>document.getElementById('recaptchaRef')).innerHTML = `<div id="recaptcha-container" style="display: none;"></div>`;
    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible'
      });
    }, 1000);
  }

  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() { }

  //Send OTP to phone - Working very fine
  async sendOtp() {
    // this.phoneNumber = (<HTMLInputElement>document.getElementById('phoneNumber')).value;
    this.timeLeft = 30;
    await this.authService.sendOTP('+91' + this.phoneNumber, this.recaptchaVerifier)
    this.otpSent = true;
    let interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  //Verify OTP & SignIN
  async signIn() {
    this.authService.signInOTPverification(this.otpEntered)
      .then(() => {
        this.otpSent = false;
        this.recaptchaVerifier.clear();
      });
  }

  retry() {
    this.otpSent = false;
  }

  //Google Authentication Login
  async login() {
    await this.authService.googleLogin();
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
