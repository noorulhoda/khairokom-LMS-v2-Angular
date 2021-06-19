import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _vps: ViewportScroller) { }

  scrollFn(anchor: string): void{
  	this._vps.scrollToAnchor(anchor)
}
  ngOnInit(): void {
  }

}
