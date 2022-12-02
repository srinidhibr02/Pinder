import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public ngFireAuth: AngularFireAuth,
    private router: Router
  ) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    //@ts-ignore
    this.ngFireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        return false;
      }
    });
    this.router.navigate(['sign-in']);
    return true
  }
}
