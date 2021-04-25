import { Component, OnInit } from '@angular/core';
import{Iuser} from '../Shared Classes and types/Iuser';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class usersComponent implements OnInit {
 userList:Iuser[];
 errMsg='';
  constructor(private userservice:UsersService) {}

  ngOnInit(): void {
    this.userservice.GetAllusers().subscribe(
      data => this.userList=data,
      error =>this.errMsg=error,
    )
    

  }

}
