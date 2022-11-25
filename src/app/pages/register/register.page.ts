import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerCredentials!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.registerCredentials = this.fb.group({
      email: [
        '',[Validators.required, Validators.email]
      ],
      phoneNo:[
        '',[Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]
      ],
      password:[
        '', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]
      ],
      agreetoTC:[
        false,[Validators.requiredTrue]
      ]
    })
  }

  get email(){
    return this.registerCredentials.get('email');
  }
  get phoneNo(){
    return this.registerCredentials.get('phoneNo');
  }
  get password(){
    return this.registerCredentials.get('password');
  }
  get agreetoTC(){
    return this.registerCredentials.get('agreetoTC')
  }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
