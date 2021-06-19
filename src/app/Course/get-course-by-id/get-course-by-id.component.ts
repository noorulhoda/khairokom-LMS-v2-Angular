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
import { notificationService } from 'src/app/services/notification.service';
import { Inotification } from 'src/app/shared/Inotification';

@Component({
  selector: 'app-get-course-by-id',
  templateUrl: './get-course-by-id.component.html',
  styleUrls: ['./get-course-by-id.component.scss']
})
export class GetCourseByIDComponent implements OnInit {

  user;
  userId=localStorage.getItem('currentUserId');
  userName=localStorage.getItem('currentUserName')
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
    //private classService:classService,
    private notificationService:notificationService) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.courseId = params['id']
      console.log('id : ' + (this.courseId));
    });

    this.cs.getCourseById(this.courseId).subscribe(
      data => {
        console.log(data)
        this.course = data[0];
        this.categoryService.getCategoryById(data[0]['categoryID']).subscribe(
          data2 => {
            console.log(data2)
            this.courseCategoryTitle =data2[0]['Title'] ;
           er=>console.log(er)
            
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

   /*  this.classService.GetAllclass().subscribe(
      data => {
        this.classes = data;
        console.log(data);
        this.classes.forEach(element => {
          if(element.CourseId==this.courseId){this.courseClasses.push(element)}
        });

      },
      error => console.log(error)
    ); */

    this.GetCourseComments();

  }

  comments: Icomment[] = [];

  ngOnInit(): void { 



    
  }
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
      userID: this.userId,
      userName:this.userName,
      courseID: this.courseId,
    }
    this.commentService.AddComment(comment).subscribe(
      data => {
       // this.router.navigateByUrl("/course")
      },
      error => {
        console.log(error)
      }
    );
    
    //window.location.reload()
    this.courseComments=[]
    this.GetCourseComments();

  }
courseComments:Icomment[]=[];
  GetCourseComments() {
    this.commentService.GetAllComments().subscribe(
      data => {
        this.comments = data;
         this.comments.forEach(element => {
           if(element.courseID==this.courseId)
             this.courseComments.push(element)
        });
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

notifyWithNewWaitingStudent(){
  var notification:Inotification={
    message:"طالب ينتظر الموافقة للالتحاق بدورة تدريبية",
    notifiedUserId:"Admin",
    courseId:this.courseId,
    studentId:this.userId,
    isRead:false
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      //this.router.navigateByUrl("/home")
      alert("تم ارسال طلب انضمامك للدورة التدريبية سنوافيك باخر الاخبار في اشعارات ملفك الشخصي ")
    },
    error => {
      console.log(error)
    }
  );
}


notifyWithNewWaitingTeacher(){
  var notification:Inotification={
    message:"معلم ينتظر الموافقة لتدريس دورة تدريبية",
    notifiedUserId:"Admin",
    courseId:this.courseId,
    teacherId:this.userId,
    isRead:false
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      //this.router.navigateByUrl("/home")
      alert("تم ارسال طلب تدريسك للدورة التدريبية سنوافيك باخر الاخبار في اشعارات ملفك الشخصي ")
    },
    error => {
      console.log(error)
    }
  );
}

}
