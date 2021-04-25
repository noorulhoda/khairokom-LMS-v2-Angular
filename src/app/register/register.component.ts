import { Component, OnInit } from '@angular/core';
import { Iuser } from '../Shared Classes and types/Iuser';


class user implements Iuser{
  id: number;
  username: string;
  name: string;
  password:string;
  email: string;
  website:string='Select Website';
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  userModel=new user();

onSubmit(data)
{
console.log(data)
console.log(this.userModel);
}
  ngOnInit(): void {
  }

}
