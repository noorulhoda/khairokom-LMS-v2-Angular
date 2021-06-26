import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Irole} from '../shared/Irole';
import{catchError} from 'rxjs/operators'
import{rolesController} from'../APIs/rolesController';
import { baseUrl } from '../config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {
url=rolesController.GetAllRoles;//api/role
  constructor(private http:HttpClient) { 
  }

Register( role:Irole): Observable<any>{
  return this.http.post(baseUrl+"/api/signup", role, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err ||"Internal Server error contact site adminstarator");
  }));
}

Login(role:any): Observable<any>{
  return this.http.post(baseUrl+"/api/signin", role,httpOptions).pipe(catchError((err)=>
  {
    return throwError(err ||"Internal Server error contact site adminstarator");
  }));
}

  GetAllroles():Observable<Irole[]>
  {
    return this.http.get<Irole[]>(this.url).pipe(catchError(err=>{
      return throwError(err||"customError happened")
    }));
  }



  getRoleById(id:string):Observable<Irole>
  {
    return this.http.get<Irole>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }
  updateRole(id, role): Observable<any> {
    return this.http.put(`${this.url}/${id}`, role,httpOptions);
  }

  deleteRole(id:string): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }
  AddRole(role: Irole): Observable<any> {
    return this.http.post(this.url,role,httpOptions).pipe(catchError(err => {
        return throwError(err || "Internal Server error contact site adminstarator")
    }));
}
  findByRoleType(roleType): Observable<Irole>{
    return this.http.get<Irole>(this.url+"/withType/"+roleType).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }

  /*findIdByRoleType(roleType:string): Observable<string>{
    return this.http.get<string>(this.url+"/withType/"+roleType).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }*/
  uploadImage(formData:FormData): Observable<any>{
    return this.http.post(this.url+"/uploadImage", formData).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }

}