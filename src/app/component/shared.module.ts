import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ShowHideToggleComponent } from "./show-hide-toggle/show-hide-toggle.component";

@NgModule({
    imports:[CommonModule, IonicModule],
    exports:[ShowHideToggleComponent],
    providers:[],
    declarations:[ShowHideToggleComponent]
})
export class SharedComponents {}