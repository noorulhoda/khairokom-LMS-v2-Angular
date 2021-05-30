import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Icourse } from '../shared/Icourse';
import { catchError } from 'rxjs/operators'
import { courseController } from '../APIs/courseController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class courseService {
    Url = courseController.Url;
    

    
    constructor(private http: HttpClient) {
    }

    GetAllCourses(): Observable<Icourse[]> {
        return this.http.get<Icourse[]>(this.Url).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
    /*GetCourseById(id:String): Observable<Icourse>{
     return this.http.get<Icourse>(Url+"/"+id, httpOptions).pipe(catchError((err)=>
      {
        return throwError(err.message ||"Internal Server error contact site adminstarator");
      }));
    }*/

    AddCourse(course: Icourse): Observable<any> {
        return this.http.post(this.Url,course,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
    UpdateCourse(id:String, course:Icourse): Observable<any>{

        return this.http.put(this.Url+"/"+id, course, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
      }
    
      DeleteCourse(id:String): Observable<any>{
        return this.http.delete(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
      }
      getCourseById(id:String): Observable<Icourse>{
        return this.http.get<Icourse>(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
      }
    }
 
