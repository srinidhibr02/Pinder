import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginCredentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
  ) {}
  ngOnInit() {
    this.loginCredentials = this.fb.group({
      userName: [
        '', [Validators.required, Validators.email]
      ],
      password:[
        '',[Validators.required, Validators.minLength(6)]
      ]
    })
  }

  async login () {
    await this.authService.signIn(this.loginCredentials.value);
  }

}
