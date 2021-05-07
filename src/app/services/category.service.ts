import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Icourse } from '../Shared Classes and types/Icourse';
import { catchError } from 'rxjs/operators'
import { categoryController } from '../APIs/categoryController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class courseService {
    getAllUrl = categoryController.getAllCategories;
    postUrl = categoryController.addCategory;
    putUrl = categoryController.putCategory;
    deleteUrl = categoryController.deleteCateogry;


    
    constructor(private http: HttpClient) {
    }

    GetAllCategories(): Observable<Icourse[]> {
        return this.http.get<Icourse[]>(this.getAllUrl).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    AddCategoory(course: Icourse): Observable<any> {
        return this.http.post(this.postUrl,course,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
}
 
