import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { feedbackService } from 'src/app/services/feedback.service';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../shared/Iuser'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   constructor(private feedbackService:feedbackService ,private userservice:UsersService,private route:ActivatedRoute,private router:Router) {}
   user:Iuser;
   id:string='defaultID';
   errMsg='errroor';
   teacherStars=0;
   AbsTeacherStars=0;
   feedbacks=[];
   feedbacksAsTeacher=[];
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
          console.log(this.teacherStars)
        })
        this.AbsTeacherStars=Math.round(this.teacherStars/this.feedbacksAsTeacher.length);
        console.log(this.AbsTeacherStars)
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

}


