import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Icategory } from '../Shared Classes and types/Icategory';
import { catchError } from 'rxjs/operators'
import { categoryController } from '../APIs/categoryController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class categoryService {
    getAllUrl = categoryController.getAllCategories;
    postUrl = categoryController.addCategory;
    putUrl = categoryController.putCategory;
    deleteUrl = categoryController.deleteCateogry;


    
    constructor(private http: HttpClient) {
    }

    GetAllCategories(): Observable<Icategory[]> {
        return this.http.get<Icategory[]>(this.getAllUrl).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    AddCategory(category: Icategory): Observable<any> {
        return this.http.post(this.postUrl,category,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }

    UpdateCategory(category: Icategory): Observable<any> {
        return this.http.put(this.putUrl,category,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
    
    DeleteCategory(category: Icategory): Observable<any> {
        return this.http.delete(this.deleteUrl,category,httpOptions).pipe(catchError(err => {
            return throwError(err.message || "Internal Server error contact site adminstarator")
        }));
    }
}
 
