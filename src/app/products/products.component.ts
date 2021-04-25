import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { $ } from 'protractor';
import { ProductService } from '../services/product.service';
import {DiscountOffers} from '../Shared Classes and types/DiscountOffers';
import {Icategory} from '../Shared Classes and types/Icategory';
import {Iproduct} from '../Shared Classes and types/Iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
   discount : DiscountOffers;
   storeName : string;
   storeLogo : string;
   clientName : String;
   isPurshased : Boolean;
   productList  :Iproduct[];
   categoryList: Icategory[]=[{ID:1,Name:"cat1"},{ID:2,Name:"cat2"}];
  
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private router:Router) { 
    
     this.discount=DiscountOffers['10%'];
     this.clientName="noor";
     this.isPurshased=false;
     this.storeLogo='/assets/logo.jpg';
     this.storeName="Tide";
     this.productList=productService.GetAllProducts();
     console.log(this.productList);
  }
  headers=['ID','Name','Quantity','Price']
  isPurchased=false;
  btnContent='buy';

  buy(){
    if(!this.isPurchased)
  {
    this.isPurchased=true;
    this.btnContent='show products Plz';
  }
    else{
    this.isPurchased=false;
    this.btnContent='buy';
  }
  }
  
  @Output() isNeededProductShownChanged= new EventEmitter();
  @Output() neededProductChanged= new EventEmitter();
  @Input() neededProductId;

  neededProduct:Iproduct;
  isNeededProductShown=false;
  renderValue(){
    this.neededProduct= this.productService.GetProductById(this.neededProductId);
    this.isNeededProductShown=true;
    this.isNeededProductShownChanged.emit(this.isNeededProductShown);
    this.neededProductChanged.emit(this.neededProduct);
    console.log(this.neededProduct);
  }
  ngOnInit(): void {
  }
  gotToChild(){
    this.router.navigate(['child'],{relativeTo:this.activatedRoute})

  }
  gotToChild2(){
    this.router.navigate(['child2'],{relativeTo:this.activatedRoute})

  }


}
