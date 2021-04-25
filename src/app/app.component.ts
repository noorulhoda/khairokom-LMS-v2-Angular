import { Component, ViewChild } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import {Iproduct} from './Shared Classes and types/Iproduct';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ProductsComponent) prComp:ProductsComponent;
  title = 'answer';


  neededProductId;
  neededProduct:Iproduct;
  isNeededProductShwn=false;

  callRenderValue(){
     this.prComp.renderValue();
  }
}
