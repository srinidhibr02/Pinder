import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-toggle',
  templateUrl: './show-hide-toggle.component.html',
  styleUrls: ['./show-hide-toggle.component.scss'],
})
export class ShowHideToggleComponent implements OnInit {
  showPassword: boolean = false;
  @ContentChild(IonInput) input!: IonInput;

  constructor() { }

  ngOnInit() {}
  toggleShow(){
    this.showPassword = ! this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}
