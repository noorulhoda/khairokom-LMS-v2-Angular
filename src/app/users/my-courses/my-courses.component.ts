import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  constructor(private userServices:UsersService) {
    // localStorage.getItem()
   }
   
  ngOnInit(): void {
  }
  

}
