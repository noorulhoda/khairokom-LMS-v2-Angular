import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/Shared Classes and types/Icategory';

@Component({
  selector: 'app-get-all-cateogries',
  templateUrl: './get-all-cateogries.component.html',
  styleUrls: ['./get-all-cateogries.component.scss']
})
export class GetAllCateogriesComponent implements OnInit {
  categoryList:Icategory[]=[];
  errorMsg:any;
  selectedID:any;
  constructor(private categoryServices:categoryService,private router:Router,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryServices.GetAllcateories().subscribe(
      employeeData=>
      {
        this.categoryList=employeeData;
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


}
