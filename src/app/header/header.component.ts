import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Irole } from '../shared/Irole';
import { Iuser } from '../shared/Iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: any;
  user: any;
  userId: any;

  constructor(private userService:UsersService) { 
  }
  pannerSrc="https://i.imgur.com/bkCeTu7.png";

  ngOnInit(): void {
       
    this.userService.findByUserName(localStorage.getItem('currentUser')).subscribe(
   
      data => {this.user= data[0]; this.userId=data[0]['_id']},
      er =>console.log(er) ,
    );
    this.findCurrentUser();
  }
  logout(){
    //console.log(localStorage.getItem('token'))
    localStorage.setItem('token','');
    localStorage.setItem('currentUser','guest')
    console.log('logouted successfully')
  //console.log(localStorage.getItem('token'))
  }
  currentUserName:string;
  currentUser:Iuser;
  currentUserRoles:string[];
  findCurrentUser(){
    this.currentUserName=localStorage.getItem('currentUser');
    this.userService.findByUserName(this.currentUserName).subscribe(
      data => {
        console.log(data)
        this.currentUser= data;this.currentUserRoles=this.currentUser.roles;
        localStorage.setItem('currentUserId',this.userId)},
      er => console.log('error happened in determine user') ,
    )
  }

  
}
