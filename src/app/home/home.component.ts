import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { RolesService } from '../services/roles.service';
import { Imessage } from '../shared/Imessage';
import { Roles } from '../shared/Roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  adminRoleId;
  constructor(private roleService: RolesService,private _vps: ViewportScroller,private fb:FormBuilder,private messageService:MessageService) { }

  scrollFn(anchor: string): void{
  	this._vps.scrollToAnchor(anchor)
}
  ngOnInit(): void {
    this.roleService.findByRoleType(Roles.Admin).subscribe(
      data=>{this.adminRoleId=data[0]['_id'];
      console.log(data)
    }
      ,er=>console.log(er)
    )
  }

  
  addForm=this.fb.group(
    {
      message:[''],
      senderName:[''],
      email:[''],
   });

   get message()
   {
     return this.addForm.get('message');
   }
   get senderName()
   {
     return this.addForm.get('senderName');
   }

   get email()
   {
     return this.addForm.get('email');
   }
   
 
  submit() 
  {
    var message:Imessage={ 
       senderId:localStorage.getItem('currentUserId'),
       receiverId:this.adminRoleId,
       isRead:false,
       message:this.message?.value,
       email:this.email?.value,
       senderName:this.senderName?.value,
    }
    this.messageService.addMessage(message).subscribe(
      data => {
      console.log(data)
      alert("تم إرسال رسالتك بنجاح")
      },
      error => {
        console.log(error)
      }
    );
  }

}
