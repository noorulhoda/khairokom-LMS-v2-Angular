import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { Irole } from 'src/app/shared/Irole';

@Component({
  selector: 'app-get-role-by-id',
  templateUrl: './get-role-by-id.component.html',
  styleUrls: ['./get-role-by-id.component.scss']
})
export class GetRoleByIDComponent implements OnInit {
  constructor( private roleService:RolesService,private route:ActivatedRoute) { }
  role:Irole;
  id:string='defaultID';
  errMsg='errroor';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) 
     this.id=params['id'] 
     console.log('id : '+(this.id));
    });
 
    this.roleService.getRoleById(this.id).subscribe(
     
        data => {this.role= data[0]; console.log(this.id);console.log(this.role);},
        er =>this.errMsg=er ,
      );
      console.log(this.role)
  }
  

   

}
