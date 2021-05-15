import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { Icourse } from 'src/app/Shared Classes and types/Icourse';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private cs:courseService,private route:ActivatedRoute,private router:Router) 
  { 
    this.route.params.subscribe(params => {
      console.log(params) 
      this.id=params['id'] 
      console.log('id : '+(this.id));
     });

     this.cs.getCourseById(this.id).subscribe(
      data => {
        this.course = data[0];
        console.log( data);
        console.log(this.course);
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {}
  
  id:String

  course:Icourse={
    tittle:'',
    description:'',
    image:'',
    categoryID:'',
  }

}
