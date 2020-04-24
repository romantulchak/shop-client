import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { error } from 'protractor';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';
import { FormGroup, FormBuilder, Validators, FormArray, Form, AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public sers:any[] = [];

  public counter:number = 0;


  public id: number;

  public categoryForm: FormGroup;





/*
  get fields(){
    return this.categoryForm.get('fields') as FormGroup;
  }

  get field(){
    return this.categoryForm.get('fields').get('section-'+ '2' ).get('field') as FormArray;
  }
  get section(){
    return this.categoryForm.get('fields').get('section-'+this.counter) as FormArray;
  }
  */

//  addField(id:number){
 //  let s = this.categoryForm.get('fields').get('section-'+id).get('field') as FormArray;
  // s.push(this.fb.control(''));
   // this.field.push(this.fb.control(''));
  //}
/*
  addSection(){
    ++this.counter;
    let ks = this.fb.group({
      id: [this.counter],
      title:[this.counter],
      field: this.fb.array([
          this.fb.control(''),
      ])
    });

    
    this.fields.addControl('section-'+this.counter, ks);
    this.sers.push(ks.value);
    console.log(this.sers);
  }


*/
  @ViewChild('editTemplate', {static:false}) editTemplate: TemplateRef<any>;

  editCategory: Category;
  category: Category = {
    id: null,
    categoryName: '',
    product: null
  };
  public selectedFile: File;
  categories: Category[];

  
  myFormValueChanges$;

  constructor(private categoryService: CategoryService, private notificationService: NotificationService, private fb: FormBuilder) { }

  ngOnInit(): void {


    this.categoryForm = this.fb.group({
      sections: this.fb.array([
        this.getSections()
      ])
    });
    
    this.myFormValueChanges$ = this.categoryForm.controls['sections'].valueChanges;
   setTimeout(() => {
      console.log((this.categoryForm.controls['sections'] as FormArray).controls[0].value);
   }, 500);

    this.getAllCategories();
    
  }
  private getSections(){
    return this.fb.group({
      title: [''],
      fields: this.fb.array([
        this.getFields()
      ])
    })
  }
  getFields(){
    return this.fb.group({
      name: this.fb.control('')
    });
  }


  addSection(){
    const control = this.categoryForm.get('sections') as FormArray;
    control.push(this.getSections());
  }
  addFields(j){
    const control = this.sections.controls[j].get('fields') as FormArray;
    control.push(this.getFields());
  }


  addField(j){
    const control = this.sections.controls[j].get('fields') as FormArray;
    control.push(this.getFields());
  }

  getSection(form){
    return form.controls.sections.controls;
  }


  get sections(){
    return this.categoryForm.get('sections') as FormArray;
  
  }

  get fields(){
    return this.categoryForm.get('sections').get('fields') as FormArray;
  }
  getFieldsForShow(form) {

    return form.controls.fields.controls as FormArray;
  }
//  getFieldsFor(){
  //  console.log((this.categoryForm.get('sections') as FormArray).controls);
//    return (this.categoryForm.get('sections').get('fields') as FormArray).controls;
 // }

 removeSection(i){
   const control = this.categoryForm.get('sections') as FormArray;
   control.removeAt(i);
 }

 //TODO: FIX it
 remove(i, j){
  const control =  <FormArray>this.categoryForm.get(['sections',i, 'fields', j, '']);
  control.removeAt(0);
  control.controls = [];

 }



  createCategory(categoryName: string){
    this.categoryService.pushCategoryImage(this.selectedFile).subscribe(
      res=>{
        console.log(res);
      }
    );

    
    this.category.categoryName = categoryName; 
    console.log(this.categoryForm.get('sections').value);
    this.categoryService.createCategory(this.category, this.categoryForm.get('sections').value).subscribe(

      res=>{
        this.notificationService.success(res);
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
          this.getAllCategories();
          this.notificationService.success(res);


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

      

        this.notificationService.success(res);
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
