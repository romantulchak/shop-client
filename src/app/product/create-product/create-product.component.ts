import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  public successMessage: string;
  public showButton = true;

  public selectedFiles: File[];


  public product: Product = {
    id:null,
    productName: '',
    category: {
      id:1,
      categoryName: '',
      product: null
    },
    description: '',
    image: null,
    productPrice: 0,
  };

  public category: Category[];
  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  public getCategories(){
    this.categoryService.getCategories().subscribe(

      res=>{
          this.category = res;
          console.log(res.length);
          if(res.length == 0){
          
            this.showButton = false;
          }else{
            this.showButton = true;
          }
      },
      error=>{
        console.log(error);
      }

    );
  }
  public createProduct(){
    this.productService.pushImage(this.selectedFiles).subscribe(

      res=>{console.log(res);},
      error=>{console.log(error);}

    );

      this.productService.createProduct(this.product).subscribe(
          
          res=>{
            this.successMessage = res;
            console.log(res);
          },
          error=>{
            console.log(error);
          }

      );
  }

  handleImages(event){
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}
