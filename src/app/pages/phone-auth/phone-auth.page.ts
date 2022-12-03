import firebase from 'firebase/compat/app'
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/auth';
import { environment } from '../../../environments/environment';
firebase.initializeApp(environment.firebaseConfig);
@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  user: any;

  otpSent: boolean = false;
  phoneNumber: string = '';
  otp = null;

  //@ts-ignore
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  //@ts-ignore
  confirmationResult: firebase.auth.ConfirmationResult;

  ngOnInit() { }

  constructor(public fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user ? user : null;
    });
  }

  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size':'invisible'
     });
  }

  sendOTP(){
    let concatPhone = '+91' + (<HTMLInputElement>document.getElementById('phoneNumber')).value;
    firebase.auth().signInWithPhoneNumber(concatPhone, this.recaptchaVerifier).then(data=>{
      this.phoneNumber = concatPhone;
      this.otpSent = true;
      this.confirmationResult = data;
    }).catch(err =>{
      console.log(err.message)
    })
  }
  verifyOTP(){
    let otpphone = (<HTMLInputElement>document.getElementById('otpphone')).value;
    this.confirmationResult.confirm(otpphone).then((data)=>{
      console.log(data)
    }).catch(err =>{
      console.log(err);
    })
  }
}
