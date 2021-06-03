import { Component, ViewChild } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Khairokom';

  callRenderValue(){
  }

  ngOnInit() {
    AOS.init();
 }
}
