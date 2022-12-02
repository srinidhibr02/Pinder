import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  current_tab!:string;
  // @ts-ignore
  @ViewChild('tabs') tabs: IonTabs;

  constructor(
    public authService:AuthService
  ) { }

  ngOnInit() {
  }
  signOut(){
    this.authService.logout();
  }
  setCurrentTab(event:any){
    this.current_tab = event.tab.toString();
  }

}
