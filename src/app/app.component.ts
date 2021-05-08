import { Component, ViewChild } from '@angular/core';
import {Iproduct} from './Shared Classes and types/Iproduct';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'answer';


  neededProductId;
  neededProduct:Iproduct;
  isNeededProductShwn=false;

  callRenderValue(){
 
  }
}
