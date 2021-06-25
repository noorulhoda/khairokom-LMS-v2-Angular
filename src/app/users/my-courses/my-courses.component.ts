import { Component, OnInit } from '@angular/core';
import { classService } from 'src/app/services/class.service';
import { courseService } from 'src/app/services/course.service';
import { UsersService } from 'src/app/services/users.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';
import { Iuser } from 'src/app/shared/Iuser';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
 
  showTeachedCourses=[]
  showJoinedClasses=[]
  teachedCourses=[]
  joinedClasses=[]
  userId=localStorage.getItem('currentUserId');
  user:Iuser;
  constructor(private userServices:UsersService,private classService:classService,private courseService:courseService) {
   
     this.userServices.getUserById(this.userId).subscribe(
       data=>{
           this.user=data[0]
           
           this.user.teachedCourses.forEach(element => {
            this.teachedCourses.push(element)
           });
           console.log(this.teachedCourses);  

           this.user.joinedClasses.forEach(element => {
            this.joinedClasses.push(element)
           });
           console.log(this.joinedClasses); 


            this.teachedCourses.forEach(element => {
            this.courseService.getCourseById(element).subscribe(
              data=>{
                this.showTeachedCourses.push(data[0])
              },
              error=>{
                console.log(error)
              }
            )
           });
           console.log(this.showTeachedCourses)

           this.joinedClasses.forEach(element => {
            this.classService.getClassById(element).subscribe(
              data=>{
                this.showJoinedClasses.push(data[0])
              },
              error=>{
                console.log(error)
              }
            )
           });
           console.log(this.showJoinedClasses)
       },
       error=>{
         console.log(error);
       }
     )
   }
   
  ngOnInit(): void {
  }
  

}
