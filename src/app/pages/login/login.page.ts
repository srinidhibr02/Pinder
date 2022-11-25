import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  ) {}
  ngOnInit() {
    this.loginCredentials = this.fb.group({
      email: [
        '', [Validators.required, Validators.email]
      ],
      password:[
        '',[Validators.required, Validators.minLength(7)]
      ]
    })
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

  async GoogleAuth(){
    // console.log('being Clicked');
    await this.authService.GoogleAuth();
  }
}
