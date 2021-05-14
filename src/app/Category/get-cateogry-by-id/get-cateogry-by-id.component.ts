import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/Shared Classes and types/Icategory';

@Component({
  selector: 'app-get-cateogry-by-id',
  templateUrl: './get-cateogry-by-id.component.html',
  styleUrls: ['./get-cateogry-by-id.component.scss']
})
export class GetCateogryByIDComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {}
   

}
