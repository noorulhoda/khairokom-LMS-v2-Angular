import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../Shared Classes and types/Iuser'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:Iuser;
  id:string;
  errMsg='';
   constructor(private userservice:UsersService,private route:ActivatedRoute,private router:Router) {
      
   }
 
   ngOnInit(): void {
   this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);  
   this.userservice.getUserById(this.id).subscribe(
       data => this.user= data,
       er =>this.errMsg=er ,
     )
   }
 

}


