import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { feedbackService } from 'src/app/services/feedback.service';
import { Ifeedback } from 'src/app/shared/Ifeedback';

@Component({
  selector: 'app-detailed-feedback',
  templateUrl: './detailed-feedback.component.html',
  styleUrls: ['./detailed-feedback.component.scss']
})
export class DetailedFeedbackComponent implements OnInit {
feedbacks:Ifeedback[];
courseFeedbacks=[];
  courseId: any;
  constructor(private route:ActivatedRoute,
    private feedbackService:feedbackService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     console.log(params) 
      this.courseId=params['courseId'] })
     this.feedbackService.getAllFeedbacks().subscribe(
       data=>{this.feedbacks=data;
    this.feedbacks.forEach(element => {
      if(element.courseId==this.courseId)
        this.courseFeedbacks.push(element)
      });}
       ,er=>console.log(er)
     )
  }

}