import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/shared/Icategory';

@Component({
  selector: 'app-get-all-cateogries',
  templateUrl: './get-all-cateogries.component.html',
  styleUrls: ['./get-all-cateogries.component.scss']
})
export class GetAllCateogriesComponent implements OnInit {

  searchedTitle;
  categoryList:Icategory[]=[];
  errorMsg:any;
  selectedID:any;
  selectedCategory=[];
  renderCategories=[];
  constructor(private categoryServices:categoryService,private router:Router,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryServices.GetAllcateories().subscribe(
      Data=>
      {
        this.categoryList=Data;
        this.renderCategories=this.categoryList
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }
    )
    this.activeRouter.paramMap.subscribe((params:ParamMap)=>
    this.selectedID=params.get('id')
    );
  }
  searchByCategoryTitle(value) 
  {
    
    this.searchedTitle = value;
    console.log(this.searchedTitle)
    this.categoryList.forEach(element=>
    {
      if(element.Title.includes(this.searchedTitle))
      {
        this.selectedCategory.push(element)
      }
    })
     console.log(this.selectedCategory)
     this.renderCategories=this.selectedCategory
     this.selectedCategory=[];
   }

}
