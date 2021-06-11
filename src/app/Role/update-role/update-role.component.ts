import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { Irole } from 'src/app/shared/Irole';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  constructor(private fb:FormBuilder,private roleService:RolesService,private route:ActivatedRoute,private router:Router) 
    {} 
    updateForm=this.fb.group({  
      type:['',[Validators.required]],
      users:[[]]
    });

    get type()
    {
      return this.updateForm.get('type');
    }
    role:Irole;
    id:string='defaultID';
    errMsg='errroor';
    loadApiData()
    {
        this.updateForm.patchValue({
        type:this.role.type,  
      })
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
       this.route.params.subscribe(params => {
       console.log(params) //log the entire params object
       this.id=params['id'] //log the value of id
       console.log('id : '+(this.id));    
   });
   
   this.roleService.getRoleById(this.id).subscribe(
       data => {this.role= data[0]; console.log(this.id);console.log(this.role);this.loadApiData()},
       er =>this.errMsg=er ,
     );
     console.log(this.role)
  }

  update()
   {  
     var newRole: Irole = {
      type:this.type?.value, 
      users:[],  
   }
   console.log(newRole)
   
   this.roleService.updateRole(this.id,newRole)
   .subscribe(
     data => {
       console.log("DATA : "+data);
       this.router.navigateByUrl("/home")
     },
     error => {
       console.log("errooorrrrr-_-"+ error)
     }
   );  
   }

}