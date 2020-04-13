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
  public updateOrder: BehaviorSubject<boolean>;
  public productsAfterRemove: BehaviorSubject<any>;
  public totalPrice: BehaviorSubject<number>;
  public products: Product[] = [];
  public priceToSubscribe :number;
  
  
  public prodToSave={
    id: null,
    productName: null,
    price: null,
    images: null,
    amount: 1,
    showButton: false,
    totalProducPrice: null,
    discount: 0,
    discountPrice: null,
    promo: null
  };
  public productsFromDb: Product[];

  
  public sa: any[] = [];


  constructor(private productService: ProductService){
    this.updateProducts = new BehaviorSubject(false);
    this.updateOrder = new BehaviorSubject(false);

    
 

    if(localStorage.getItem('product') != null){
      this.getProductsFromDb();
    }else{
      this.count = new BehaviorSubject<number>(0);
      this.productsAfterRemove = new BehaviorSubject(this.sa);
      this.totalPrice = new BehaviorSubject(0);
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
      this.totalPrice = new BehaviorSubject(this.price());
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

      return prod;
  }
  updateCart(){
    if(localStorage.getItem('product') != null){
      this.products = this.sa;
      this.count.next(this.sa.length);
    }
  }
  addToBasket(product: Product){
    this.prodToSave={
      id:product.id,
      productName: product.productName,
      images: product.image,
      amount: 1,
      price: null,
      showButton: true,
      totalProducPrice: null,
      discount:0,
      discountPrice:null,
      promo: null
    }
    if(product.isGlobalDiscount){
      this.prodToSave.price = product.discountPrice;
      this.prodToSave.totalProducPrice = product.discountPrice;
    }else{
      this.prodToSave.price = product.productPrice;
      this.prodToSave.totalProducPrice = product.productPrice;
    }


    if(localStorage.getItem('product') != null){
      this.sa = JSON.parse(localStorage.getItem('product'));
    }
    this.sa.push(this.prodToSave);
    this.productsAfterRemove.next(this.sa);
    localStorage.setItem('product', JSON.stringify(this.sa));
    this.count.next(this.sa.length); 
    this.totalPrice = new BehaviorSubject(this.price());

  }

  //TODO: don't update products after remove
  remove(){
    this.updateProducts.next(true);
    this.sa = JSON.parse(localStorage.getItem('product'));
    this.totalPrice = new BehaviorSubject(this.price());
  }

  price():number{
    this.priceToSubscribe = 0;
    if(this.sa.length != 0 && this.sa != null){
      this.sa.forEach(el=>{
          this.priceToSubscribe += el.totalProducPrice;
        });
    }
    return this.priceToSubscribe;
  }

}
