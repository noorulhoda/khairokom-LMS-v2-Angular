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
import { feedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-get-course-by-id',
  templateUrl: './get-course-by-id.component.html',
  styleUrls: ['./get-course-by-id.component.scss']
})
export class GetCourseByIDComponent implements OnInit {

  changeColor : boolean = false;
  user;
  userId
  userName
  userIsAdmin
  courseId: string;
  classes=[];
  studnentCourseClasses=[];
  studentClasses: any;
  currentUserClasses=[];
  teacherCourseClasses=[];
  clas;
  courseStars=0;
  AbsCourseStars=0;
  feedbacks=[];
  feedbacksAsCousre=[];

  constructor(private feedbackService:feedbackService,
    private cs: courseService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder,
    private commentService: commentService,
    private categoryService: categoryService,
    private userService: UsersService,
    private classService:classService,
    private notificationService:notificationService) 
    {
    this.route.params.subscribe(params => {
      console.log(params)
      this.courseId = params['id']
      console.log('id : ' + (this.courseId));   

    });

    this.cs.getCourseById(this.courseId).subscribe(
      data => {
        this.userId=localStorage.getItem('currentUserId');
        this.userName=localStorage.getItem('currentUserName')
        if(localStorage.getItem('isAdmin')=="true")this.userIsAdmin=true;else if(localStorage.getItem('isAdmin')=="false") this.userIsAdmin=false
        console.log(this.userId+this.userIsAdmin)
        console.log("***********************************************************************")
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
    this.feedbackService.getAllFeedbacks().subscribe(
      data=>{
       this.feedbacks=data;
       this.feedbacks.forEach(element=>{
         console.log(element)

         if(element.courseId==this.courseId && element.feedbackedUserType=="Teacher")
         {
           console.log(element)
           this.feedbacksAsCousre.push(element);
           this.courseStars+=element.starsNumber;
           
         }
         console.log(this.courseStars)
       })
       this.AbsCourseStars=Math.round(this.courseStars/this.feedbacksAsCousre.length);
       console.log(this.AbsCourseStars)
      },
      error=>{console.log(error)}
    )

    this.userService.getUserById(localStorage.getItem('currentUserId')).subscribe(
      data => {
        this.user = data[0];
        this.studentClasses = data[0]['joinedClasses']
        console.log("@@@@@@")
         console.log(this.studentClasses)
        this.studentClasses.forEach(element => {

          this.classService.getClassById(element).subscribe(
            data=>{
               this.clas=data[0]
               console.log("//////////////////")
               console.log(this.clas)
              if(data[0]['CourseId']==this.courseId)
              {
                this.studnentCourseClasses.push(data[0])
              }
            },
            error=>{console.log(error)}
          )
        
        });
        console.log("*********************")
       
        console.log(this.studnentCourseClasses)
      },
      error => console.log(error)
    );

     this.classService.GetAllclass().subscribe(
      data => {
        this.classes = data;
        console.log(this.classes);

        this.classes.forEach(element => {
          if(element.TeacherId==localStorage.getItem('currentUserId')&&element.CourseId==this.courseId)
          {
            this.teacherCourseClasses.push(element)
          }
        });
        console.log(this.teacherCourseClasses)

      },
      error => console.log(error)
    ); 

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
counter(i: number) {
  return new Array(i);
}

deleteComment(id){
this.commentService.DeleteComment(id).subscribe(data=>{},er=>{})
}

}
