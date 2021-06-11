import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { Irole } from 'src/app/shared/Irole';
import { Iuser } from 'src/app/shared/Iuser';

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {
  user:Iuser;
  role:Irole;
  id:string='defaultID';
  errMsg='errroor';
  users: Iuser[] = [];
  roles:Irole[]=[];
  constructor(private roleService:RolesService,private userServices: UsersService,private router:Router,private route:ActivatedRoute) {
    this.getUsers();
    this.getRoles();
  }
  ngOnInit(): void {
  }
  getUsers() {
    this.userServices.GetAllusers().subscribe(
      data => {
        this.users = data

      }
    );
  }
  getRoles() {
    this.roleService.GetAllroles().subscribe(
      data => {
        this.roles = data
      }
    );
  }

  onChange(roleType,userId,roleId,isChecked)
  {
    if(isChecked==true)
    {
      console.log("Tmam");
    }
    else
    {
      console.log("NO");
    }
    //console.log(name+"  " + isChecked+"  " + id+"  "+userID);
    
  }
  
}

