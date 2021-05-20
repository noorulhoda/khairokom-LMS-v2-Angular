import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Iuser } from '../Shared Classes and types/Iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UsersService) { 
  }
  pannerSrc="https://i.imgur.com/bkCeTu7.png";

  ngOnInit(): void {
    localStorage.setItem('currentUser','guest')
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
  currentUserRole:string;
  findCurrentUser(){
    this.currentUserName=localStorage.getItem('currentUser');
    this.userService.findByUserName(this.currentUserName).subscribe(
      data => {this.currentUser= data;this.currentUserRole=this.currentUser.role},
      er => console.log('error happened in determine user') ,
    )
  }

  
}
