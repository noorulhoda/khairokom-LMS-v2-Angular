import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { Irole } from 'src/app/shared/Irole';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  constructor(private roleService:RolesService,private fb:FormBuilder,private router:Router) 
  { } 
  ngOnInit(): void {
  }
  addForm=this.fb.group(
    {
      type:['',[Validators.required]],
      users:[[]]
    });

    get type()
   {
     return this.addForm.get('type');
   }
   get users()
   {
    return this.addForm.get('users');
   }
   submit() 
  {
    var role:Irole={ 
      type:this.type?.value,
      users:this.users?.value,      
    }
    console.log(role)
    this.roleService.AddRole(role).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }
}

