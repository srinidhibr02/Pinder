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

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event:any){
    this.current_tab = event.tab.toString();
  }

}
