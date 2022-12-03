import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(
    private router: Router,
    ) {
      if(sessionStorage.getItem('ViewedOnboarding')){
        this.router.navigate(['/sign-in']);
      }
      else sessionStorage.setItem('ViewedOnboarding', 'true');
    }

  proceed(){
    this.router.navigate(['/sign-in']);
  }
  
}
