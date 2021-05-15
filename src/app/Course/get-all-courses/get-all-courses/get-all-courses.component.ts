import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { Icourse } from 'src/app/Shared Classes and types/Icourse';

@Component({
  selector: 'app-get-all-courses',
  templateUrl: './get-all-courses.component.html',
  styleUrls: ['./get-all-courses.component.scss']
})
export class GetAllCoursesComponent implements OnInit {
  courses: Icourse[] = [];
  constructor(private cs:courseService,private route:ActivatedRoute,private router:Router) 
  { 
  this.getCourses();
  }

  ngOnInit(): void {
  }
getCourses() 
{
  this.cs.GetAllCourses().subscribe(
    data => {
      console.log(data);
      this.courses = data
});}

}
