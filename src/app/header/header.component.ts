import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { 
  }
  pannerSrc="https://i.imgur.com/bkCeTu7.png";

  ngOnInit(): void {
  }
  logout(){
    //console.log(localStorage.getItem('token'))
    localStorage.setItem('token','');
    console.log('logouted')
  //console.log(localStorage.getItem('token'))
  }

}
