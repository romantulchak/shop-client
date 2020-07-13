import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../service/subcategory.service';
import { Subcategory } from '../model/subcategory.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  public subcategory: Subcategory = new Subcategory();

  constructor(private subcategoryService: SubcategoryService,private fb: FormBuilder, private categoryService: CategoryService) { }
  myFormValueChanges$;
  public categoryForm: FormGroup;
  public categories: Category[];
  ngOnInit(): void {
    this.getCategories();
    this.categoryForm = this.fb.group({
      sections: this.fb.array([
        this.getSections()
      ])
    });

    this.myFormValueChanges$ = this.categoryForm.controls['sections'].valueChanges;
   setTimeout(() => {
      console.log((this.categoryForm.controls['sections'] as FormArray).controls[0].value);
   }, 500);
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


 removeSection(i){
   const control = this.categoryForm.get('sections') as FormArray;
   control.removeAt(i);
 }

 //TODO: FIX it
 remove(i, j){
   console.log(i);
   console.log(j);
  const control = this.sections.controls[i].get('fields') as FormArray;
  console.log(control);
  //<FormArray>this.categoryForm.get(['sections',i, 'fields', j, '']);
  control.removeAt(j);
  //control.controls = [];

 }

  public createSubcategory(subcategoryName:string, categoryId:number){
    this.subcategory.subcategoryName = subcategoryName;
    this.subcategory.category = new Category(categoryId);
    console.log(this.subcategory);
    this.subcategoryService.createSubcategory(this.subcategory, this.categoryForm.get('sections').value).subscribe(
      res=>{
        if(res != null){
          console.log(res);

        }
      }
    );

  }
  private getCategories(){
    this.categoryService.getCategories().subscribe(
      res=>{
        if(res != null){
          this.categories = res;
        }
      }
    );
  }
}
