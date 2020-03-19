import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { BasketService } from '../service/basket.service';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { error, element } from 'protractor';
import { identifierModuleUrl } from '@angular/compiler';
import { MatDialog} from '@angular/material/dialog';
import { OrderService } from '../service/order.service';
import {DialogSearchComponent} from '../dialog-search/dialog-search.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public products: Product[];
  public identificationNumberForSeach: string;

  public category: Category = {
    id: null,
    categoryName: '',
    product: null
  };
  public categories: Category[];
  constructor(private productService: ProductService,private orderService: OrderService, private basketService: BasketService, private categoryService: CategoryService, public dialog: MatDialog) { }

  showButtonBuy = true;

 
  productCheck: any[] = [];
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.productCheck =  JSON.parse(localStorage.getItem('product'));
  }
  search(){
   
    this.orderService.findByIdentificationNumber(this.identificationNumberForSeach).subscribe(
      res=>{
       

        if(res != null){
          this.dialog.open(DialogSearchComponent,{
            data: {
              data: res
            }
          });
        }
      
        console.log('FROM MAIN');
        console.log(res);
        
     
      },
      error=>{
        console.log(error);
      }

    );
  }

  check(product: Product){
    if(this.productCheck != null){
          this.productCheck.forEach(e =>{
             if(product.id === e.id){
               return false;
             }else{
               console.log('TRUE');
               return true;
             }
          });
    }
  }

  getProducts(){
     this.productService.getProducts().subscribe(
        res=>{
           this.products = res;
           console.log(res);
           //if(res != null){
            //this.checkProduct();
           //}
        },
        error => {
          console.log(error);
        }
     );
  }


  getCategories(){
    this.categoryService.getCategories().subscribe(

      res=>{

        if(res != null){
          this.categories = res;
        }

      },
      error=>{
        console.log(error);
      }


    );
  }

  filterByPrice(){
    this.productService.getProductsByPrice().subscribe(

      res=>{
        this.products = res;
        console.log(res);
     },
     error => {
       console.log(error);
     }

    );
  }
  deleteProduct(id: number){
    console.log(id);

    console.log(JSON.parse(localStorage.getItem('product')));

    this.productService.deleteProduct(id).subscribe(
      res=>{
        console.log(res);
        this.getProducts();
      },
      error=>{console.log(error);}

    );
  }

  addToCart(product: Product){
    this.basketService.addToBasket(product);
    
    /* this.sa.id = product.id;
    this.sa.name = product.productName;
  
    if(localStorage.getItem('product') === null){     
        this.prodToadd.push(this.sa);
        console.log('sadsadsa');
        console.log(this.prodToadd);
        localStorage.setItem('product', JSON.stringify(this.prodToadd));
        //localStorage.setItem('product', JSON.stringify(this.sa));    
      }else{
        this.prodToadd = this.basketService.sa;
        console.log('Basket sa')
        console.log(this.basketService.sa);
        
        this.prodToadd.push(this.sa);
        console.log('TOADDDDDDDDDDd');
        console.log(this.prodToadd);
        localStorage.setItem('product', JSON.stringify(this.prodToadd));
    }*/
    //this.basketService.updateCart();
  }

  filterByCategory(){
    console.log(this.category.categoryName);
    this.productService.filterByCategory(this.category).subscribe(
      res=>{
        if(res != null){
          this.products = res;
          console.log(res);
        }
    
      },
      error=>{
        console.log(error);
      }

    );
  }

}
