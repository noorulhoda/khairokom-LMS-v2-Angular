import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { feedbackService } from 'src/app/services/feedback.service';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../shared/Iuser'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hoveredFeedbackClassNumber: any;
   constructor(private feedbackService:feedbackService ,
    private userservice:UsersService,
    private route:ActivatedRoute,
    private classService:classService,
    private router:Router) {}
   user;
   visitorUserId=localStorage.getItem('currentUserId');
   //visitorUserName=localStorage.getItem('currentUserName')
   visitorIsAdmin=localStorage.getItem('isAdmin');
   
   id:string='defaultID';
   errMsg='errroor';
   teacherStars=0;
   AbsTeacherStars=0;
   feedbacks=[];
   feedbacksAsTeacher=[];
   feedbacksAsStudent=[];
   thereIsFeedbackAsTeacher:Boolean
   thereIsFeedbackAsStudent:Boolean
   ngOnInit(): void {
   this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
   this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    this.id=params['id'] //log the value of id
    console.log('id : '+(this.id));
    this.sureDelete=false;
   });
   
   this.userservice.getUserById(this.id).subscribe(
    
       data => {this.user= data[0]; console.log(this.id);console.log(this.user);},
       er =>this.errMsg=er ,
     );
     console.log(this.user)
     this.feedbackService.getAllFeedbacks().subscribe(
       data=>{
        this.feedbacks=data;
        this.feedbacks.forEach(element=>{
          console.log(element)

          if(element.getterId==this.id && element.feedbackedUserType=="Teacher")
          {
            console.log(element)
            this.feedbacksAsTeacher.push(element);
            this.teacherStars+=element.starsNumber;
            
          }
          if(this.feedbacksAsTeacher.length>0)this.thereIsFeedbackAsTeacher=true
          console.log(this.teacherStars)
          this.AbsTeacherStars=Math.round(this.teacherStars/this.feedbacksAsTeacher.length);
          console.log(this.AbsTeacherStars)
          if(element.getterId==this.id && element.feedbackedUserType=="Student")
          {
            console.log(element)
            this.feedbacksAsStudent.push(element);
          }
          if(this.feedbacksAsStudent.length>0)this.thereIsFeedbackAsStudent=true
          console.log(this.feedbacksAsStudent)
          
        })
     
       },
       error=>{console.log(error)}
     )
   }
   sureDelete;
   delete(){
     if(!this.sureDelete){
     alert(" سوف تقوم بحذف حسابك إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
     this.sureDelete=true; 
    }
     else{
     this.userservice.deleteUser(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    ); } }
 
    counter(i: number) {
      return new Array(i);
  }

  getClassNumber(classId){
    console.log(classId)
    this.classService.getClassById("60d10a23f5f09442cc11b76b").subscribe(
      data=>{
        //console.log(data)
        //console.log("***********************************")
       /// this.hoveredFeedbackClassNumber= data[0]['Number']
       return data[0]['Number']
    
 },
      er=>console.log(er)
    )
  }

}


