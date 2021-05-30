import { Injectable } from '@angular/core';
import{Iproduct} from '../shared/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:Iproduct [];
  constructor() { 
    this.products=[{ID:1,Name:"samsung",Quantity:10,Price:1000,Img:'https://i.imgur.com/KFojDGa.jpg'},{ID:2,Name:"Oppo",Quantity:10,Price:5000,Img:'https://i.imgur.com/KFojDGa.jpg'}];
  }
  GetAllProducts(){
    return this.products;
  }
  GetProductById(Id){
    Id=parseInt(Id);
    if(typeof(Id)=='number'){
      for(var p of this.products){
        if(p.ID==Id)
           return p;
      }
      return null;
  }return null;
}
}
