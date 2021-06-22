import { Component, OnInit } from '@angular/core';
import { categoryService } from '../services/category.service';
import { Icategory } from '../shared/Icategory';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent implements OnInit {

  categoryList:Icategory[]=[];
  categoriesList:Icategory[]=[];
  errorMsg:any;
  counter=0;
  constructor(private categoryServices:categoryService ) { }

  ngOnInit(): void {
    this.categoryServices.GetAllcateories().subscribe(
      Data=>
      {
        this.categoryList=Data;
        this.categoryList.forEach(element=>{
        if(this.counter>=2)
        {
          return this.counter;
        }
        else
        {
          this.categoriesList.push(element)
        }
        this.counter+=1;
        })
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }
    )
  }

}
