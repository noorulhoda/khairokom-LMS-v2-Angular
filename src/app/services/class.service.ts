import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Iclass } from '../Shared Classes and types/Iclass';
import { catchError } from 'rxjs/operators'
import { classController } from '../APIs/classController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class classService {
    getAllUrl = classController.getAllClasses;
    postUrl = classController.addClass;
    putUrl = classController.putClass;
    deleteUrl = classController.deleteClass;


    
    constructor(private http: HttpClient) {
    }

    GetAllClasses(): Observable<Iclass[]> {
        return this.http.get<Iclass[]>(this.getAllUrl).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    AddClass(classs: Iclass): Observable<any> {
        return this.http.post(this.postUrl,class,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    UpdateClass(classs: Iclass): Observable<any> {
        return this.http.put(this.putUrl,classs,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
    
    DeleteClass(classs: Iclass): Observable<any> {
        return this.http.delete(this.deleteUrl,classs,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
}
 
