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

  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  deleteUser(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف هذا المستخدم إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }

else if(this.sureDelete){
    this.userservice.deleteUser(id)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      window.location.reload();
  }
}
}
