import { AuthService } from './../../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  phoneNumber: any;
  otpSent: boolean = false;
  otp = null;

  
  constructor(
    private toaster: ToastController,
    private alertCtrl: AlertController,
    private authService:AuthService
  ) {}

  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() { }
  //Send OTP to phone
  async sendOtp() {
    this.authService.sendOTP(this.phoneNumber)
    .then(()=>{
      this.otpSent = true;
    });
  }
  //Verify OTP & SignIN
  async signIn() {
    this.authService.signIn(this.otp);
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
