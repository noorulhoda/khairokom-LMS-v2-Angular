import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/Shared Classes and types/Icategory';

@Component({
  selector: 'app-get-cateogry-by-id',
  templateUrl: './get-cateogry-by-id.component.html',
  styleUrls: ['./get-cateogry-by-id.component.scss']
})
export class GetCateogryByIDComponent implements OnInit {

  constructor( private categoryService:categoryService,private route:ActivatedRoute,private router:Router) { }
  category:Icategory;
  id:string='defaultID';
  errMsg='errroor';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) //log the entire params object
     this.id=params['id'] //log the value of id
     console.log('id : '+(this.id));
    });
 
    this.categoryService.getCategoryById(this.id).subscribe(
     
        data => {this.category= data[0]; console.log(this.id);console.log(this.category);},
        er =>this.errMsg=er ,
      );
      console.log(this.category)
  }
  delete(){
    this.categoryService.deleteCategory(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    );  }
   

}
