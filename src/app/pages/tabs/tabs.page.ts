import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  current_tab!:string;
  // @ts-ignore
  @ViewChild('tabs') tabs: IonTabs;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  setCurrentTab(event:any){
    this.current_tab = event.tab.toString();
  }

  signout(){
    this.authService.logout();
  }

}
