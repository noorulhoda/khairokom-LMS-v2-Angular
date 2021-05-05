import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Icourse} from '../Shared Classes and types/Icourse';
import{catchError} from 'rxjs/operators'
import{courseController} from'../APIs/courseController';
@Injectable({
  providedIn: 'root'
})
export class postsService {
getAllUrl=courseController.GetAllCourses;
postUrl=courseController.AddCourse;
putUrl=courseController.putCourse;
deleteUrl=courseController.delete;

  constructor(private http:HttpClient) { 
  }

  GetAllCourses():Observable<Icourse[]>
  {
    return this.http.get<Icourse[]>(this.getAllUrl).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }


}
