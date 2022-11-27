import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectTab: any;
  
  //@ts-ignore
  @ViewChild('tabs') tabs: IonTabs;
  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event:any){
    console.log(event);
    this.selectTab = this.tabs.getSelected();
  }

}
