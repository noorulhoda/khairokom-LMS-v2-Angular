import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Icomment } from '../shared/Icomment';
import { catchError } from 'rxjs/operators'
import { commentController } from '../APIs/commentController';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
    providedIn: 'root'
})

export class commentService {
    Url = commentController.Url;
    

    
    constructor(private http: HttpClient) {
    }

    GetAllComments(): Observable<Icomment[]> {
        return this.http.get<Icomment[]>(this.Url).pipe(catchError(err => {
            return throwError(err || "Internal Server error contact site adminstarator")
        }));
    }

    AddComment(comment: Icomment): Observable<any> {
        return this.http.post(this.Url,comment,httpOptions).pipe(catchError(err => {
            return throwError(err || "Internal Server error contact site adminstarator")
        }));
    }
    UpdateComment(id:String, comment:Icomment): Observable<any>{

        return this.http.put(this.Url+"/"+id, comment, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err ||"Internal Server error contact site adminstarator");
        }));
      }
    
      DeleteComment(id:String): Observable<any>{
        return this.http.delete(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err ||"Internal Server error contact site adminstarator");
        }));
      }
      getCommentById(id:String): Observable<Icomment>{
        return this.http.get<Icomment>(this.Url+"/"+id, httpOptions).pipe(catchError((err)=>
        {
          return throwError(err ||"Internal Server error contact site adminstarator");
        }));
      }
    }
 
