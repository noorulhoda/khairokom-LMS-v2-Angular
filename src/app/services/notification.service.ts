import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Inotification} from '../shared/Inotification';
import{catchError} from 'rxjs/operators'
import{notificationController} from'../APIs/notificationController';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class notificationService {
   url = notificationController.getAllNotifications;  
  constructor(private http:HttpClient) { 
  
  }
  getAllCountries():Observable<Inotification[]>
  {
    return this.http.get<Inotification[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }

  getNotificationById(id:string):Observable<Inotification>
  {
    return this.http.get<Inotification>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getNotificationByName(name:string):Observable<any>
  {
    return this.http.get<any>(this.url+"/withName/"+name,httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  } 



}
