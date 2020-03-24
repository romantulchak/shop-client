import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';
import { Image } from '../model/image.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


  public count: BehaviorSubject<number>;
  public products: Product[] = [];
  public prodToSave={
    id: null,
    productName: null,
    price: null,
    images: null,
    amount: 1,
    showButton: false,
  };
  public productsFromDb: Product[];

  public sa: any[] = [];


  constructor(private productService: ProductService){
    if(localStorage.getItem('product') != null){
      //this.products = JSON.parse(localStorage.getItem('product'));
    
    
      this.getProductsFromDb();
      setTimeout(() => {
        
      this.count = new BehaviorSubject(this.sa.length);
      }, 500);
      
    }else{
      this.count = new BehaviorSubject<number>(0);
      
    }
   
  
  }
  getFromDb(){
    this.productService.getProducts().subscribe(
      res=>{
        if(res != null){
          this.productsFromDb = res;
        }
      }
    );
  }
  getProductsFromDb(){
    this.productService.getProducts().subscribe(
      res=>{
        if(res != null){
          this.productsFromDb = res;
          this.getProducts();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  getProducts(){
    if(localStorage.getItem('product') != null){
     //this.products = JSON.parse(localStorage.getItem('product'));
     this.sa = JSON.parse(localStorage.getItem('product'));

     //this.products = this.productInBasket();
     this.sa = this.productInBasket();
    }

    //return this.products;
  }
  productInBasket(): any[]{
    let prod = [];      
            this.sa.forEach(element => {
                this.productsFromDb.forEach(el=>{
                  if(element.id == el.id){
                    prod.push(element);
                    this.products.push(el);
                  }
                });
             
            });
            console.log('PROD');
            console.log(prod);

      return prod;
  }
  



  updateCart(){
    if(localStorage.getItem('product') != null){
      this.products = this.sa;
      console.log('PROSSSSSSSSs');
      console.log(this.products);
      this.count.next(this.sa.length);
    }
  }

  
  addToBasket(product: Product){
    this.prodToSave={
      id:product.id,
      productName: product.productName,
      price: product.productPrice,
      images: product.image,
      amount: 1,
      showButton: true
      
    }
    if(localStorage.getItem('product') != null){
      this.sa = JSON.parse(localStorage.getItem('product'));
    }
    this.sa.push(this.prodToSave);
    console.log(this.sa);
    
    localStorage.setItem('product', JSON.stringify(this.sa));
    this.count.next(this.sa.length); 
  }

  



}
