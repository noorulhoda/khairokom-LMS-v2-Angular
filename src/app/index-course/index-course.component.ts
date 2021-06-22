import { Component, OnInit } from '@angular/core';
import { courseService } from '../services/course.service';
import { Icourse } from '../shared/Icourse';

@Component({
  selector: 'app-index-course',
  templateUrl: './index-course.component.html',
  styleUrls: ['./index-course.component.scss']
})
export class IndexCourseComponent implements OnInit {

  courseList:Icourse[]=[];
  coursesList:Icourse[]=[];
  errorMsg:any;
  counter=0;
  constructor(private courseServices:courseService ) { }

  ngOnInit(): void {
    this.courseServices.GetAllCourses().subscribe(
      Data=>
      {
        this.courseList=Data;
        this.courseList.forEach(element=>{
        if(this.counter>=3)
        {
          return this.counter;
        }
        else
        {
          this.coursesList.push(element)
        }
        this.counter+=1;
        })
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }
    )
  }

}
