import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { Roles } from '../shared/Roles';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminGaurdService implements CanActivate{
  isAdmin:boolean;
  currentUserId
  currentUser;
  adminRoleId;
  constructor(private userService:UsersService,private roleService:RolesService,private router:Router) { 
    this.roleService.findByRoleType(Roles.superAdmin).subscribe(
   data=>this.adminRoleId=data[0]['_id']
    )
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.currentUserId=localStorage.getItem('currentUserId')
    this.userService.getUserById(this.currentUserId).subscribe(
      data=>{
        this.currentUser=data[0]
        if(this.currentUser.roles.includes(this.adminRoleId))
       { this.isAdmin=true
        this.router.navigateByUrl(state.url)
        return true
      }
        else{
        this.isAdmin=false
        this.router.navigateByUrl('/forbidden')
         return false
       }
      }
    )
    return this.isAdmin;
  }


  }
