import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sessionController } from '../APIs/sessionController';
import { Isession } from './../shared/Isession';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  Url = sessionController.GetAllSessions;

  constructor(private http: HttpClient) { }

  GetAllSessions(): Observable<Isession[]> {
    return this.http.get<Isession[]>(this.Url).pipe(catchError(err => {
        return throwError(err.message || "Internal Server error contact site adminstarator")
    }));
}

AddSession(course: Isession): Observable<any> {
  return this.http.post(this.Url,course,httpOptions).pipe(catchError(err => {
      return throwError(err.message || "Internal Server error contact site adminstarator")
  }));
}

UpdateSession(id:String, course:Isession): Observable<any>{

  return this.http.put(this.Url+"/"+id, course, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}

DeleteSession(id:String): Observable<any>{
  return this.http.delete(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}

getSessionById(id:String): Observable<Isession>{
  return this.http.get<Isession>(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}
