
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

import jwt_decode from 'jwt-decode';


import {CredentialResponse, PromptMomentNotification} from 'google-one-tap';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginCredentials!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private _ngZone: NgZone
  ) {}
  ngOnInit() {
    this.loginCredentials = this.fb.group({
      email: [
        '', [Validators.required, Validators.email]
      ],
      password:[
        '',[Validators.required, Validators.minLength(7)]
      ]
    });

    //@ts-ignore
    window.onGoogleLibraryLoad = () =>{
      //@ts-ignore
      google.accounts.id.initialize({
        client_id:'219565146680-o5t692j82jd30vecqubu7v4dttuvb65v.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      //@ts-ignore
      google.accounts.id.renderButton(
        //@ts-ignore
        document.getElementById('buttonDiv'),
        {theme:'outline',size:'large',width:"100%", shape:'circle'}
      );
      //@ts-ignore
      google.accounts.id.prompt((notification : PromptMomentNotification)=> {}) 
    };
  }

  get email(){
    return this.loginCredentials.get('email');
  }
  get password(){
    return this.loginCredentials.get('password');
  }

  async login () {
    await this.authService.signIn(this.loginCredentials.value);
  }

  async handleCredentialResponse(response: CredentialResponse){
    console.log(response);
    await this.getDecodedAccessToken(response.credential)
    .then(
      (x:any)=>{
        localStorage.setItem('token',x.token);
        this._ngZone.run(()=>{
          this.router.navigate(['/home']);
        })
      }
    )
    .catch((error:any)=>{
      debugger
      console.log(error);
    })
  }
  async getDecodedAccessToken(token: string){
      console.log(jwt_decode(token))
      return jwt_decode(token);
  }
}
