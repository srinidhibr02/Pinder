import { SignInPage } from './pages/sign-in/sign-in.page';
import { PhoneAuthPage } from './pages/phone-auth/phone-auth.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeGuard } from './guards/welcome.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'welcome'
  },
  {
    path: 'welcome',
    component: WelcomePage,
    canActivate: [WelcomeGuard],
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'sign-in',
    component: SignInPage,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'phone-auth',
    component: PhoneAuthPage,
    loadChildren: () => import('./pages/phone-auth/phone-auth.module').then( m => m.PhoneAuthPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path:'**',
    redirectTo:'home'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
