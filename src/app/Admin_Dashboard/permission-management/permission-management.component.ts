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
  arrayRole=[];
  arrayUser=[];
  idUser:string='defaultID';
  idRole:string='defaultID';
  errMsg='errroor';
  users: Iuser[] = [];
  roles:Irole[]=[];
  constructor(private roleService:RolesService,private userServices: UsersService,private router:Router,private route:ActivatedRoute) {
    this.getUsers();
    this.getRoles();
  }
  ngOnInit(): void {
    this.getID("","");
    this.updateRoles();
    this.updateUsers();
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

  getID(roleId,userId)
  {
    this.roleService.getRoleById(roleId).subscribe(
      data1 => {
      //this.arrayUser=data1[0]['users']
      this.role= data1[0];
    },
      er =>this.errMsg=er ,
    );
    this.userServices.getUserById(userId).subscribe(
      data => {
     // this.arrayRole=data[0]['roles']
      this.user= data[0];
    },
      er =>this.errMsg=er ,
    );
    console.log(this.arrayRole);
  }
  onChange(roleType,userId,roleId,isChecked)
  {
    this.idRole=roleId;
    this.idUser=userId;
    this.getID(roleId,userId);

    if(isChecked==true)
    {
     this.arrayRole.push(roleId);
     this.arrayUser.push(userId);
     console.log(this.arrayRole);
     console.log(this.arrayUser);
    }
    else
    {
      this.arrayRole.forEach((element,index)=>{
        if(element==roleId) this.arrayRole.splice(index,1);
     });

     this.arrayUser.forEach((element,index)=>{
      if(element==userId) this.arrayUser.splice(index,1);
   });
      this.deleteOldRoles(roleId);
      this.deleteOldUsers(userId);
      console.log(this.arrayRole);
      console.log(this.arrayUser);
    }
    this.updateRoles();
    this.filterRoles();
    this.updateUsers();
    this.filterUsers();
    console.log(this.user);
    console.log(this.role);
    userId='';
    roleId='';

  }
   deleteOldRoles(roleId)
   {
     this.user.roles.forEach((element,index)=>{
       if(element==roleId) this.user.roles.splice(index,1);
    });
   }
    deleteOldUsers(userId)
    {
      this.role.users.forEach((element,index)=>{
        if(element==userId) this.role.users.splice(index,1);
     });
    }
  updateRoles()
  {
     this.arrayRole.forEach((element,index)=>{
        this.user.roles.push(this.arrayRole[index]);
     });
  //  this.user.roles=this.arrayRole;
  }
   updateUsers()
   {
      this.arrayUser.forEach((element,index)=>{
           this.role.users.push(this.arrayUser[index]);
     });
     //this.role.users=this.arrayUser;
   }
  filterRoles()
  {
    this.user.roles = this.user.roles.filter((element, i) => i === this.user.roles.indexOf(element));
    console.log(this.user.roles);
    this.updateUserServices();
  }
   filterUsers()
   {
     this.role.users = this.role.users.filter((element, i) => i === this.role.users.indexOf(element));
     console.log(this.role.users);
     this.updateRoleServices();
      this.arrayRole=[];
   }
 updateUserServices()
 {
  this.userServices.updateUser(this.idUser,this.user)
  .subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log("Error"+ error)
    }
  );
 }
  updateRoleServices()
  {
   this.roleService.updateRole(this.idRole,this.role)
   .subscribe(
     data => {
       console.log(data);
     },
     error => {
       console.log("Error"+ error) 
    }
   );
  }




}

