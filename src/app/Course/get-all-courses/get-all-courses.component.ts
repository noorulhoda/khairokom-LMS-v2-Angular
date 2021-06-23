import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { Icourse } from 'src/app/shared/Icourse';
import { Icategory } from 'src/app/shared/Icategory';
import { categoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-get-all-courses',
  templateUrl: './get-all-courses.component.html',
  styleUrls: ['./get-all-courses.component.scss']
})
export class GetAllCoursesComponent implements OnInit {
  serverName;
  categoriesTitle:Icategory[]=[];
  courses: Icourse[] = [];
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
        console.log(this.categoriesTitle)///هنا انا جبت كل الاقسام للكورسات اللى عندى
        }
     );
 
  }

  searchByCouresTitle(value) 
  {
    this.serverName = value;
    console.log(this.serverName)
    this.courses.forEach(element=>
    {
      if(element.tittle.includes(this.serverName))
      {
        this.selectedCourses.push(element)
      }
    })
     console.log(this.selectedCourses)
     this.courses=this.selectedCourses
    // this.selectedCourses=[];
   }
}

