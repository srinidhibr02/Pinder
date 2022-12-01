import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  notAuthenticated:boolean = true;
  constructor(public ngFireAuth: AngularFireAuth){
    this.ngFireAuth.authState.subscribe((user)=>{
      this.notAuthenticated = false
    })
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    console.log(this.notAuthenticated);
    return await this.notAuthenticated;
  }
  
}
