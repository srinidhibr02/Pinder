import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  getAuth, 
  browserSessionPersistence  
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any

  constructor(
    private auth: Auth,
    private toaster:ToastController,
    private loadingCtrl:LoadingController,
    private router:Router
  ) {}

  //login with email/password
  async signIn(email: string, password: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.auth.setPersistence(browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(this.auth , email, password).then((data) => {
        if (!data.user?.emailVerified) {
          loading.dismiss();
          this.toast('Please verify your email address!', 'warning');
          this.auth.signOut();
        } else {
          loading.dismiss();
          this.router.navigate(['/home'])
        }
      })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger')
        })
    })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
  }

  async signOut(){
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();

    signOut(this.auth)
    .then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
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
