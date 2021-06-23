import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { Icourse } from 'src/app/shared/Icourse';
import { Icategory } from 'src/app/shared/Icategory';
import { categoryService } from 'src/app/services/category.service';
import { element } from 'protractor';

@Component({
  selector: 'app-get-all-courses',
  templateUrl: './get-all-courses.component.html',
  styleUrls: ['./get-all-courses.component.scss']
})
export class GetAllCoursesComponent implements OnInit {
 
  value;
  serverName;
  categoriesTitle:Icategory[]=[];
  courses: Icourse[] = [];
  categories = [];
  selectedCourses=[];
  constructor(private categoryServices:categoryService ,private courseService:courseService,private route:ActivatedRoute,private router:Router,private categoryService: categoryService) 
  { }

  ngOnInit(): void {
    this.courseService.GetAllCourses().subscribe(
      data => {
        this.courses = data
        console.log(this.courses)
        this.courses.forEach(element=>{
          this.categoryServices.getCategoryById(element.categoryID).subscribe(
          data=>{
             this.categoriesTitle.push(data[0])
          },
          error=>{
            console.log(error)
          }
        )
       })
        console.log(this.categoriesTitle)
        }
     );
 
  }
      

  OnInput(value) {
    this.serverName = value;
    console.log(this.serverName)
    this.categoriesTitle.forEach(element=>{
      if(element.Title== this.serverName)
      {
        this.categories.push(element)
      }
    })
    this.categories.forEach(element1=>{
      this.courses.forEach(element2=>{
        if(element1._id==element2.categoryID)
        {
          this.selectedCourses.push(element2)
        }
      })
    })
    this.courses=this.selectedCourses;
    console.log("****************************")
    console.log(this.courses)
   }

// delete(id) {
//   this.courseService.DeleteCourse(id)
//     .subscribe(
//       data => {
//         this.router.navigateByUrl("")
//       },
//       error => {
//         console.log("Error-_-" + error)
//       }
//     );
// }
/*for(let i=0;i<data.length;i++){
        console.log(i);
        this.categoryService.getCategoryById(data[i].categoryID).subscribe(
          data2 => {this.categories.push(data2[0].Title) }
        );*/
}

