import firebase from 'firebase/compat/app'
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  user: any;

  otpSent: boolean = false;
  phoneNumber = null;
  otp = null;
  recaptchaVerifier: any;
  confirmationResult: any;

  ngOnInit() {
  
  }
  sendOtp() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      "size": "invisible"
    });
    this.fireAuth.signInWithPhoneNumber("+91" + this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.otpSent = true;
      }).catch(err => {
        console.log(err);
      })
  }
  signIn() {
    this.confirmationResult.confirm(this.otp).then((user:any) => {
      console.log(user)
    });
  }


  constructor(public fireAuth: AngularFireAuth) {
      this.fireAuth.authState.subscribe((user) => {
        this.user = user ? user : null;
      });
    }

  login() {
      const token = this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      console.log(token);
    }

  logout() {
      this.fireAuth.signOut();
    }


}
