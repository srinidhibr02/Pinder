import { AuthService } from './../../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
  otpSent: boolean = false;
  phoneNumber:string = '';
  //@ts-ignore
  timeLeft:number;
  //@ts-ignore
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  //@ts-ignore
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(
    private toaster: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService:AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ionViewDidEnter() {  
    this.timeLeft = 20;
    (<HTMLElement>document.getElementById('recaptchaRef')).innerHTML = `<div id="recaptcha-container" style="display: none;"></div>`;
    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible'
      });
    }, 2000);
  }

  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() { }

  //Send OTP to phone
  async sendOtp() {
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    const phoneNumber = (<HTMLInputElement>document.getElementById('phoneNumber')).value;
    firebase.auth().signInWithPhoneNumber('+91'+phoneNumber, this.recaptchaVerifier)
    .then((data)=>{
      loading.dismiss();
      this.phoneNumber = phoneNumber;
      this.otpSent = true;
      let interval = setInterval(()=>{
        this.timeLeft -= 1;
        if(this.timeLeft <= 0){
          clearInterval(interval);
        }
      },1000);
      this.confirmationResult = data;
      // console.log(data);
      this.presentToast('OTP Sent', 'success');
    })
    .catch(error =>{
      loading.dismiss();
      this.presentToast('Failed to send OTP', 'danger');
      console.log(error.message);
    })
  }
  //Verify OTP & SignIN
  async signIn() {
    const userEnteredOTP = (<HTMLInputElement>document.getElementById('userEnteredOTP')).value;
    this.confirmationResult.confirm(userEnteredOTP)
    .then((data)=>{
      console.log(data);
      this.otpSent = false;
      this.recaptchaVerifier.clear();
      this.ngZone.run(()=>{
        this.router.navigate(['/tabs']);
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  retry(){
    this.otpSent = false;
  }

  //Google Authentication Login
  async login(){
    this.authService.googleLogin();
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
