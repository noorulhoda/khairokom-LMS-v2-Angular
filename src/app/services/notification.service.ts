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
  getAllNotifications():Observable<Inotification[]>
  {
    return this.http.get<Inotification[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }
 addNotification(notification: Inotification): Observable<any> {
    return this.http.post(this.url,notification,httpOptions).pipe(catchError(err => {
        return throwError(err.message || "Internal Server error contact site adminstarator")
    }));
}
  getNotificationById(id:String):Observable<Inotification>
  {
    return this.http.get<Inotification>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  updateNotification(id:String, notification:Inotification): Observable<any>{

    return this.http.put(this.url+"/"+id, notification, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  deleteNotification(id:String): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }



}
