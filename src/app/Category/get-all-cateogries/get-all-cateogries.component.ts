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

  serverName;
  categoryList:Icategory[]=[];
  errorMsg:any;
  selectedID:any;
  selectedCategory=[]
  constructor(private categoryServices:categoryService,private router:Router,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryServices.GetAllcateories().subscribe(
      Data=>
      {
        this.categoryList=Data;
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
    this.serverName = value;
    console.log(this.serverName)
    this.categoryList.forEach(element=>
    {
      if(element.Title.includes(this.serverName))
      {
        this.selectedCategory.push(element)
      }
    })
     console.log(this.selectedCategory)
     this.categoryList=this.selectedCategory
    // this.selectedCategory=[];
   }

}
