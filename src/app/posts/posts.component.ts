import { Component, OnInit } from '@angular/core';
import { postsService } from '../services/posts.service';
import{Ipost} from '../Shared Classes and types/Ipost'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
 postList:Ipost[];
 errMsg='';
  constructor(private postservice:postsService) {
     
  }

  ngOnInit(): void {
  this.postservice.GetAllposts().subscribe(
      data => this.postList= data,
      er =>this.errMsg=er ,
    )
    

  }

}
