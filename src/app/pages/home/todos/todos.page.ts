import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  today:Date = new Date();
  currentWeek:Array<Date> = [];
  isModalOpen = false;
  
  constructor() { }

  ngOnInit() {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    for(let i=0;i<7;i++){
      this.currentWeek.push(
        new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i)
      );
    }
  }

  compareDatetoToday(date:Date){
      return date.setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
