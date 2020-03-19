import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { error } from 'protractor';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('editTemplate', {static:false}) editTemplate: TemplateRef<any>;

  editCategory: Category;
  category: Category = {
    id: null,
    categoryName: '',
    product: null
  };
  categories: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  
    this.getAllCategories();
  }
  createCategory(){
    this.categoryService.createCategory(this.category).subscribe(

      res=>{
        console.log(res);
        this.getAllCategories();
      },
      error=>{console.log(error);}

    );
  }
  getAllCategories(){
    this.categoryService.getCategories().subscribe(

      res=>{this.categories = res;},
      error=>{console.log(error);}

    );
  }
  delete(id:number){
    this.categoryService.deleteCategory(id).subscribe(
        res=>{console.log(res);},
        error=>{console.log(error);}
    );
  }

  edit(category: Category){
    this.editCategory = new Category(category.id, category.categoryName, category.product);
  }

  loadTemplate(category: Category){
      if(this.editCategory && this.editCategory.id === category.id){
        return this.editTemplate;
      }
  }


  updateCategory(category: Category){
    this.categoryService.editCategory(category).subscribe(
      res=>{
        this.getAllCategories();
        console.log(res);
      },
      error=>{console.log(error);}

    );
  }

} 
