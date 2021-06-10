import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/shared/Icategory';

@Component({
  selector: 'app-get-all-categories-admin',
  templateUrl: './get-all-categories-admin.component.html',
  styleUrls: ['./get-all-categories-admin.component.scss']
})
export class GetAllCategoriesAdminComponent implements OnInit {
  category:Icategory;
  id:string='defaultID';
  errMsg='errroor';
  categories: Icategory[] = [];
  constructor(private categoryServices: categoryService,private router:Router,private route:ActivatedRoute) {
    this.getCategories();
  }

  ngOnInit(): void {
  }
  getCategories() {
    this.categoryServices.GetAllcateories().subscribe(
      data => {
        this.categories = data

      }
    );
  }
  delete(id) {
    this.categoryServices.deleteCategory(id)
      .subscribe(
        data => {
          this.router.navigateByUrl("")
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
  }

}
