import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { courseService } from 'src/app/services/course.service';
import { Icategory } from 'src/app/shared/Icategory';
import { Icourse } from 'src/app/shared/Icourse';

@Component({
  selector: 'app-get-cateogry-by-id',
  templateUrl: './get-cateogry-by-id.component.html',
  styleUrls: ['./get-cateogry-by-id.component.scss']
})
export class GetCateogryByIDComponent implements OnInit {

  constructor(private courseService:courseService, private categoryService:categoryService,private route:ActivatedRoute) { }
  category:Icategory;
  courses:Icourse[]=[];
  categoryCourses:Icourse[]=[];
  id:string='defaultID';
  errMsg='errroor';
  ngOnInit(): void {
    //this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) 
     this.id=params['id'] 
     console.log('id : '+(this.id));
    });
 
    this.categoryService.getCategoryById(this.id).subscribe(
     
        data => {
          this.category= data[0]; 
          console.log(this.id);
          console.log(this.category);
          this.courseService.GetAllCourses().subscribe (
            data=>{
              this.courses=data
              console.log(data);
              this.courses.forEach(element => {
                if(element.categoryID==this.id)
                {
                  this.categoryCourses.push(element);
                }
              });
            },
            er=>{
              console.log(er);
            }
          )
        },
        er =>this.errMsg=er ,
      );
      console.log(this.category)
    
  }

   

}
