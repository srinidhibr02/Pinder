import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatesPageRoutingModule } from './mates-routing.module';

import { MatesPage } from './mates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatesPageRoutingModule
  ],
  declarations: [MatesPage]
})
export class MatesPageModule {}
