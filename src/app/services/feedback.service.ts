import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Ifeedback} from '../shared/Ifeedback';
import{catchError} from 'rxjs/operators'
import{feedbackController} from'../APIs/feedbackController';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class feedbackService {
   url = feedbackController.getAllFeedbacks;  
  constructor(private http:HttpClient) { 
  
  }
  getAllFeedbacks():Observable<Ifeedback[]>
  {
    return this.http.get<Ifeedback[]>(this.url).pipe(catchError(err=>{
      return throwError(err||"customError happened")
    }));
  }
 addFeedback(feedback: Ifeedback): Observable<any> {
    return this.http.post(this.url,feedback,httpOptions).pipe(catchError(err => {
        return throwError(err || "Internal Server error contact site adminstarator")
    }));
}
  getFeedbackById(id:String):Observable<Ifeedback>
  {
    return this.http.get<Ifeedback>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }

  updateFeedback(id:String, feedback:Ifeedback): Observable<any>{

    return this.http.put(this.url+"/"+id, feedback, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }

  deleteFeedback(id:String): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err ||"Internal Server error contact site adminstarator");
    }));
  }



}
