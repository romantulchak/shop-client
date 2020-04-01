import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Brand } from 'src/app/model/brand.models';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


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
    brand: new Brand(),
  };

  public category: Category[];
  public brands: Brand[];
  constructor(private brandService: BrandService,private notificationService: NotificationService, private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
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

      res=>{
        
        console.log(res);
        
      },
      error=>{console.log(error);}

    );

      this.productService.createProduct(this.product).subscribe(
          
          res=>{
            this.notificationService.openSnackBar(res);
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
  getBrands(){
    this.brandService.getAllBrands().subscribe(
      res=>{
        if(res != null){
          this.brands = res;
        }
      }
    );
  }

}
