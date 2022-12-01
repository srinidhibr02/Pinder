import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneAuthPageRoutingModule } from './phone-auth-routing.module';

import { PhoneAuthPage } from './phone-auth.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneAuthPageRoutingModule,
    AngularFireAuthModule
  ],
  declarations: [PhoneAuthPage]
})
export class PhoneAuthPageModule {}
