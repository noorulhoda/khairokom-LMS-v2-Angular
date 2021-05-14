import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../Shared Classes and types/Iuser'
@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.scss']
})
export class GetAllComponent implements OnInit {
 userList:Iuser[];
 errMsg='';
  constructor(private userservice:UsersService) {
     
  }
neededRole:string;
  ngOnInit(): void {
  this.userservice.GetAllusers().subscribe(
      data => this.userList= data,
      er =>this.errMsg=er ,
    )
    

  }

}
