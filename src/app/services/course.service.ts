import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Icourse } from '../Shared Classes and types/Icourse';
import { catchError } from 'rxjs/operators'
import { courseController } from '../APIs/courseController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class courseService {
    getAllUrl = courseController.GetAllCourses;
    postUrl = courseController.AddCourse;
    putUrl = courseController.putCourse;
    deleteUrl = courseController.delete;


    
    constructor(private http: HttpClient) {
    }

    GetAllCourses(): Observable<Icourse[]> {
        return this.http.get<Icourse[]>(this.getAllUrl).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    AddCourse(course: Icourse): Observable<any> {
        return this.http.post(this.postUrl,course,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
}
 
