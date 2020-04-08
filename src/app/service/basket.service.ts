import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';




@Injectable({
  providedIn: 'root'
})
export class BasketService {


  public count: BehaviorSubject<number>;
  public updateProducts: BehaviorSubject<boolean>; 
  public productsAfterRemove: BehaviorSubject<any>;
  public products: Product[] = [];
  public prodToSave={
    id: null,
    productName: null,
    price: null,
    images: null,
    amount: 1,
    showButton: false,
    totalProducPrice: null
  };
  public productsFromDb: Product[];

  public sa: any[] = [];


  constructor(private productService: ProductService){
    this.updateProducts = new BehaviorSubject(false);
    if(localStorage.getItem('product') != null){
      this.getProductsFromDb();
    
      
    }else{
      this.count = new BehaviorSubject<number>(0);
      this.productsAfterRemove = new BehaviorSubject(this.sa);
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

     this.sa = this.productInBasket();
     if(this.sa != null)
      this.count = new BehaviorSubject(this.sa.length);
      this.productsAfterRemove = new BehaviorSubject(this.sa);
    }

    //return this.products;
  }
  productInBasket(): any[]{
    let prod = [];      
            this.sa.forEach(element => {
                this.productsFromDb.forEach(el=>{
                  if(element.id == el.id){
                    prod.push(element);
                    //prod.push(el);
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
      showButton: true,
      totalProducPrice: product.productPrice

      
    }
    if(localStorage.getItem('product') != null){
      this.sa = JSON.parse(localStorage.getItem('product'));
    }
    this.sa.push(this.prodToSave);
    this.productsAfterRemove.next(this.sa);

    
    localStorage.setItem('product', JSON.stringify(this.sa));
    this.count.next(this.sa.length); 
  }

  remove(){
    this.updateProducts.next(true);
    this.sa = JSON.parse(localStorage.getItem('product'));
  }



}
