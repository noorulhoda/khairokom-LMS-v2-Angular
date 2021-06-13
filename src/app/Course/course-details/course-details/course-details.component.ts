import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { commentService } from 'src/app/services/comment.service';
import { categoryService } from 'src/app/services/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icourse } from 'src/app/shared/Icourse';
import { Icomment } from 'src/app/shared/Icomment';
import { UsersService } from 'src/app/services/users.service';
import { Iuser } from 'src/app/shared/Iuser';
import { classService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/shared/Iclass';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  user;
  userId=localStorage.getItem('currentUserId');
  courseId: string;
  classes:Iclass[]=[];
  courseClasses:Iclass[]=[];
  userClasses: any;
  constructor(private cs: courseService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder,
    private commentService: commentService,
    private categoryService: categoryService,
    private userService: UsersService,
    private classService:classService) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.courseId = params['id']
      console.log('id : ' + (this.courseId));
    });

    this.cs.getCourseById(this.courseId).subscribe(
      data => {
        this.course = data[0];
        this.categoryService.getCategoryById(data[0].categoryID).subscribe(
          data2 => {
            this.courseCategoryTitle = data2[0].Title;
          });
      },
      error => console.log(error)
    );

    this.userService.getUserById(localStorage.getItem('currentUserId')).subscribe(
      data => {
        this.user = data[0];
        this.userClasses = data[0]['joinedClasses']

      },
      error => console.log(error)
    );

    this.classService.GetAllclass().subscribe(
      data => {
        this.classes = data;
        console.log(data);
        this.classes.forEach(element => {
          if(element.CourseId==this.courseId){this.courseClasses.push(element)}
        });

      },
      error => console.log(error)
    );

    this.GetCourseComments();

  }

  comments: Icomment[] = [];

  ngOnInit(): void { }
  addCommentForm = this.fb.group(
    {
      content: [''],
      courseID: [''],
      userID: [''],
    });

  courseCategoryTitle: string;
  course: Icourse = {
    tittle: '',
    description: '',
    image: '',
    categoryID: '',
    teachers: []
  }

  delete() {
    this.cs.DeleteCourse(this.courseId)
      .subscribe(
        data => {
          this.router.navigateByUrl("course")
        },
        error => {
          console.log("errooorrrrr-_-" + error)
        }
      );
  }
  get content() {
    return this.addCommentForm.get('content');
  }
  AddComment() {
    var comment: Icomment = {
      content: this.content?.value,
      userID: "#user",//localStorage.getItem('currentUserId'),
      courseID: this.courseId,
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

  GetCourseComments() {
    this.commentService.GetAllComments().subscribe(
      data => {
        this.comments = data;
        console.log(data);
      },
      error => {
        console.log(error)
      }
    );
    console.log(this.comments);
  }
  fun(c: Icomment) {
    return c.courseID == this.courseId;
  }

  enroll() {
  var userAge=Date.now()-this.user.birthDate
  if(this.courseClasses.length==0){
    var clas:Iclass={ 
      Number:'c1',
      StudentsMinAge:userAge-2,
      StudentsMaxAge:userAge+3,
      StudentGender:this.user.gender,
      ClassLink:"",
      ClassLinkPassword:"",
      StartDate:new Date(),
      EndDate:new Date(),
      CourseId:this.courseId,
      TeacherId:"",
      Students:[this.user]
     
   }
   console.log(clas)
 
   this.classService.AddClass(clas).subscribe(
     data => {
       this.router.navigateByUrl("/home")
     },
     error => {
       console.log(error)
     }
   );
  }

  else{
  //var classs
  this.courseClasses.forEach(element => {
      if(
        element.StudentGender==this.user.gender
        &&element.StudentsMinAge<userAge
        &&element.StudentsMaxAge>userAge
        )
      {
           this.user.joinedClasses.push(element);
           //element.Students.push(this.user)
           //classs=element;
      }
    });
    this.userService.updateUser(localStorage.getItem('currentUserId'), this.user)
      .subscribe(
        data => {
          console.log("Data: " + data);
          //this.router.navigateByUrl("/home")
        },
        error => {
          console.log("errooorrrrr-_-" + error)
        }
      );
   /*    this.classService.updateClass("howTo get this class id ?", classs)
      .subscribe(
        data => {
          console.log("Data: " + data);
          //this.router.navigateByUrl("/home")
        },
        error => {
          console.log("errooorrrrr-_-" + error)
        }
      ); */
 
   } }
}
