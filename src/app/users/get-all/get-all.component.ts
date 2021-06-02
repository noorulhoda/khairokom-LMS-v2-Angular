import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { Irole } from 'src/app/shared/Irole';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../shared/Iuser'
@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.scss']
})
export class GetAllComponent implements OnInit {
 userList:Iuser[];
 rolesList:Irole[];
 errMsg='';
  constructor(private userservice:UsersService,private roleService:RolesService) {
     
  }
neededRole:string;
  ngOnInit(): void {
  this.userservice.GetAllusers().subscribe(
      data => this.userList= data,
      er =>this.errMsg=er ,
    )

    this.roleService.GetAllroles().subscribe(
      data => this.rolesList= data,
      er =>this.errMsg=er ,
    )
    

  }

}
