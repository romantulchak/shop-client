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
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fullWidth',[
      state('max', style({
        width:'7em',
        color: '#fff',
        background: 'orange'
        
      })),
      state('min', style({
        width: '2em'
      })),
      transition('max => min', [
        animate('0.5s')
      ]),
      transition('min => max', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {

  public styleOn = false;
  public currentProduct: Product;


  public loading = true;
  public productToCompare: Product;
  public products: Product[];


  public category: Category = {
    id: null,
    categoryName: '',
    product: null
  };
  public categories: Category[];
  constructor(private productService: ProductService,private orderService: OrderService, private basketService: BasketService, private categoryService: CategoryService, public dialog?: MatDialog) { }

  showButtonBuy = false;

 
  productCheck: any[] = [];
  ngOnInit(): void {

    
    setTimeout(() => {
      this.getProducts();
      this.getCategories();
      this.productCheck =  this.basketService.sa;
      console.log("this.productCheck");
      console.log(this.productCheck);

   }, 500);

    setTimeout(() => {
      this.products.forEach(e=>{
        this.productCheck.forEach(el=>{
            if(e.id === el.id){
              e.showButton = el.showButton;
            }
        });
      });
    }, 1000);

  }

  mouseEnter(onStyle: boolean, product: Product){
    this.currentProduct = product;
    this.styleOn = onStyle;

  }
  mouseLeave(onStyle: boolean, product: Product){
    this.styleOn = onStyle;

  }

 


  getProducts(){
    this.productService.getProducts().subscribe(
        res=>{
           this.products = res;

           if(res != null){
             setTimeout(() => {
              this.loading = false;
             }, 500);
           }
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
        this.basketService.getProductsFromDb();
      },
      error=>{console.log(error);}

    );
  }


  addToCart(product: Product){
    this.productToCompare = product;
    this.showButtonBuy = true;
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
