import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { courseService } from 'src/app/services/course.service';
import { Icategory } from 'src/app/shared/Icategory';
import { Icourse } from 'src/app/shared/Icourse';

@Component({
  selector: 'app-get-all-categories-admin',
  templateUrl: './get-all-categories-admin.component.html',
  styleUrls: ['./get-all-categories-admin.component.scss']
})
export class GetAllCategoriesAdminComponent implements OnInit {
  category:Icategory;
  errMsg='errroor';
  courses:Icourse[]=[];
  course:Icourse;
  categoryCourses=[];
  categories: Icategory[] = [];
  constructor(private courseService:courseService,private categoryServices: categoryService,private router:Router,private route:ActivatedRoute) {
    this.getCategories();
  }

  ngOnInit(): void {
  }
  getCategories() {
    this.categoryServices.GetAllcateories().subscribe(
      data => {
        this.categories = data

      }
    );
  }


  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  delete(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف القسم و كذلك الدورات التدربية التى يحتوى عليها هذا القسم إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }
     else if(this.sureDelete){

    this.categoryServices.deleteCategory(id).subscribe(
        data => {
          this.courseService.GetAllCourses().subscribe (
            data=>{
              this.courses=data
              console.log(this.courses);
            
              this.courses.forEach(element => {
                if(element.categoryID==id)
                {
                  this.categoryCourses.push(element);
                }
              });
              console.log(this.categoryCourses)
              
               this.categoryCourses.forEach(element=>{
                  this.courseService.DeleteCourse(element._id).subscribe(
                    data=>{console.log(data)},
                    error=>{console.log(error)}

                  )
            })},
            er=>{
              console.log(er);
            }
          ) 
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      //window.location.reload();
     
  }
  }
}
