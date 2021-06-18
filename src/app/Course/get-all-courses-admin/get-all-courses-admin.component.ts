import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from 'src/app/shared/Icategory';
import { Icourse } from 'src/app/shared/Icourse';
import { courseService } from 'src/app/services/course.service';
import { categoryService } from 'src/app/services/category.service';
import { classService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/shared/Iclass';

@Component({
  selector: 'app-get-all-courses-admin',
  templateUrl: './get-all-courses-admin.component.html',
  styleUrls: ['./get-all-courses-admin.component.scss']
})
export class GetAllCoursesAdminComponent implements OnInit {


  classes:Iclass[]=[]
  courseClasses=[]
  courses: Icourse[] = [];
  tempCategory:Icategory;
  categories: string[] = [];
  constructor(private classService:classService, private courseService:courseService,private route:ActivatedRoute,private router:Router,private categoryService: categoryService) 
  { 
  this.getCourses();
  }

  ngOnInit(): void {
  }
  
getCourses() 
{
  this.courseService.GetAllCourses().subscribe(
    data => {
      this.courses = data
    
      }
);}

sureDelete:Boolean=false;
deleteNew:Boolean=true;
delete(id) {
  if(this.deleteNew){
    alert(" سوف تقوم بحذف الدورة التدربية و كذلك المجموعات التى تحتوى عليها هذه الدورة التدربية إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
    this.sureDelete=true; 
    this.deleteNew=false;
   }
   else if(this.sureDelete){

  this.courseService.DeleteCourse(id).subscribe(
      data => {
        this.classService.GetAllclass().subscribe (
          data=>{
            this.classes=data
            console.log(this.classes);
          
            this.classes.forEach(element => {
              if(element.CourseId==id)
              {
                this.courseClasses.push(element);
              }
            });
            console.log(this.courseClasses)
            
             this.courseClasses.forEach(element=>{
                this.classService.deleteCLass(element._id).subscribe(
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
    this.ngOnInit();
}

}

}

