import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { commentService } from 'src/app/services/comment.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icourse } from 'src/app/Shared Classes and types/Icourse';
import { Icomment } from 'src/app/Shared Classes and types/Icomment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private cs:courseService,
    private route:ActivatedRoute,
    private router:Router,private fb:FormBuilder,
    private commentService:commentService) 
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
  addCommentForm=this.fb.group(
    {
    content:[''],
    courseID:[''],
    userID:[''],
   });  
  id:String;
  course:Icourse={
    tittle:'',
    description:'',
    image:'',
    categoryID:'',
  }
  
  delete(){
    this.cs.DeleteCourse(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("course")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    );  
  }
  get content()
  {
    return this.addCommentForm.get('content');
  }
  AddComment(){
    var comment:Icomment={ 
      content:this.content?.value,
      userID:'11',
      courseID:this.id,
    }
   this.commentService.AddComment(comment).subscribe(
     data => {
       this.router.navigateByUrl("/course")
     },
     error => {
       console.log(error)
     }
   );
  }
}
