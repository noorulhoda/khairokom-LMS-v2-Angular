import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{catchError} from 'rxjs/operators'
import{messageController} from '../APIs/messageController';
import { Imessage } from '../shared/Imessage';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = messageController.getAllMessages;
  constructor(private http:HttpClient) { }

  getAllMessages():Observable<Imessage[]>
  {
    return this.http.get<Imessage[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }

 addMessage(message: Imessage): Observable<any> {
    return this.http.post(this.url,message,httpOptions).pipe(catchError(err => {
        return throwError(err.message || "Internal Server error contact site adminstarator")
    }));
}
  getMessageById(id:String):Observable<Imessage>
  {
    return this.http.get<Imessage>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  updateMessage(id:String, message:Imessage): Observable<any>{

    return this.http.put(this.url+"/"+id, message, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  deleteMessage(id:String): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }



}
