import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { error } from 'protractor';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public categoryForm = this.fb.group({
    categoryName: ['', Validators.required],
    fields: this.fb.array([
      this.fb.control('')
    ])
  })


  get fields(){
    return this.categoryForm.get('fields') as FormArray;
  }


  addField(){
    this.fields.push(this.fb.control(''));
  }






  private durationInSeconds = 5;
  @ViewChild('editTemplate', {static:false}) editTemplate: TemplateRef<any>;

  editCategory: Category;
  category: Category = {
    id: null,
    categoryName: '',
    product: null
  };
  public selectedFile: File;
  categories: Category[];

  


  constructor(private categoryService: CategoryService, private notificationService: NotificationService, private fb: FormBuilder) { }

  ngOnInit(): void {
  
    this.getAllCategories();
    
  }
  createCategory(){
    this.categoryService.pushCategoryImage(this.selectedFile).subscribe(
      res=>{
        console.log(res);
      }
    );

    this.category.categoryName = this.categoryForm.get('categoryName').value;
    this.categoryService.createCategory(this.category, this.categoryForm.get('fields').value).subscribe(

      res=>{
        this.notificationService.openSnackBar(res);
        this.getAllCategories();
      },
      error=>{console.log(error);}

    );
  }
  getAllCategories(){
    this.categoryService.getCategories().subscribe(

      res=>{
        
        this.categories = res;
        console.log(res);
      },
      error=>{console.log(error);}

    );
  }
  delete(id:number){
    this.categoryService.deleteCategory(id).subscribe(
        res=>{

          this.notificationService.openSnackBar(res);


        },
        error=>{console.log(error);}
    );
  }

  edit(category: Category){
    this.editCategory = new Category(category.id, category.categoryName, category.product, category.imagePath);
  }

  loadTemplate(category: Category){
      if(this.editCategory && this.editCategory.id === category.id){
        return this.editTemplate;
      }
  }


  updateCategory(category: Category){
    this.categoryService.editCategory(category).subscribe(
      res=>{

      

        this.notificationService.openSnackBar(res);
        this.getAllCategories();
        console.log(res);
      },
      error=>{console.log(error);}

    );
  }

  handleImages(event){
    this.selectedFile = event.target.files[0];
  }

} 
