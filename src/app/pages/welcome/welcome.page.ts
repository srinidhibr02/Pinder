import { Component, OnInit } from '@angular/core';
import SwiperCore, {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  config:SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    
  }
  constructor() { }

  ngOnInit() {
  }

}
