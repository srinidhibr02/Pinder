import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from 'firebase/auth';

import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: any;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private toaster: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    public ngZone: NgZone
  ) { }

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
        this.toast('Please verify your email address!', 'warning');
        this.ngFireAuth.signOut();
      } else {
        loading.dismiss();
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
  GoogleAuth(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

 // @ts-ignore
  AuthLogin(provider){
    return this.ngFireAuth
    .signInWithPopup(provider)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['dashboard']);
      });
      //this.SetUserData(result.user);
    })
    .catch((error)=>{
      this.toast(error.message, 'danger');
    })
  }

  async toast(message: string, status: string) {
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
