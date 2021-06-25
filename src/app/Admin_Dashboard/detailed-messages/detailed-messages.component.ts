import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Imessage } from 'src/app/shared/Imessage';

@Component({
  selector: 'app-detailed-messages',
  templateUrl: './detailed-messages.component.html',
  styleUrls: ['./detailed-messages.component.scss']
})
export class DetailedMessagesComponent implements OnInit {
  constructor( private messageService:MessageService,private route:ActivatedRoute) { }
  message:Imessage;
  id:string='defaultID';
  errMsg='errroor';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) 
     this.id=params['id'] 
     console.log('id : '+(this.id));
    });
 
    this.messageService.getMessageById(this.id).subscribe(
     
        data => {this.message= data[0]; console.log(this.id);console.log(this.message);},
        er =>this.errMsg=er ,
      );
      console.log(this.message)
  }
  

   

}
