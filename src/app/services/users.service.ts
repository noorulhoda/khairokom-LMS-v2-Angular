import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Iuser} from '../Shared Classes and types/Iuser';
import{catchError} from 'rxjs/operators'
import{usersController} from'../APIs/usersController';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
url=usersController.GetAllUsers;
  constructor(private http:HttpClient) { 
  
  }
  GetAllusers():Observable<Iuser[]>
  {
    return this.http.get<Iuser[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }
}
