import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from 'src/app/shared/Icategory';
import { Icourse } from 'src/app/shared/Icourse';
import { courseService } from 'src/app/services/course.service';
import { categoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-get-all-courses-admin',
  templateUrl: './get-all-courses-admin.component.html',
  styleUrls: ['./get-all-courses-admin.component.scss']
})
export class GetAllCoursesAdminComponent implements OnInit {

  courses: Icourse[] = [];
  tempCategory:Icategory;
  categories: string[] = [];
  constructor(private courseService:courseService,private route:ActivatedRoute,private router:Router,private categoryService: categoryService) 
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
delete(id) {
  this.courseService.DeleteCourse(id)
    .subscribe(
      data => {
        this.router.navigateByUrl("")
      },
      error => {
        console.log("Error-_-" + error)
      }
    );
}

}

