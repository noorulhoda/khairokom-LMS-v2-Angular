import { ThisReceiver } from '@angular/compiler';
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
/*for(let i=0;i<data.length;i++){
        console.log(i);
        this.categoryService.getCategoryById(data[i].categoryID).subscribe(
          data2 => {this.categories.push(data2[0].Title) }
        );*/
}

