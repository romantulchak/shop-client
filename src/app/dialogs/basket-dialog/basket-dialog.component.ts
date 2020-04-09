import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../service/basket.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { Order } from '../../model/order.model';
import {OrderService} from '../../service/order.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../../main/main.component';
import { CategoryService } from '../../service/category.service';
import { asapScheduler } from 'rxjs';
import { NotificationService } from '../../service/notification.service';
@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.css']
})
export class BasketDialogComponent implements OnInit {

  public loading = true;
  public products: Product[] = [];
  public productsFromDb: Product[] = [];
  public sa: any[] = [];
  public totalPrice: number = 0;
  public showOrderForm = false;
  public orderNumber: string;


  public test: number;

  public order: Order = {
    id: null,
    items: [],
    //productsId: [],
    //amounts: [],
    email: null,
    statuses: null,
    costumerAddress: null,
    costumerCity: null,
    costumerLastName: null,
    costumerName: null,
    customerMobilePhone: null,
    customerPostalCode: null,
    totalPrice: null
  }

  constructor(private notificationService: NotificationService, public dialog: MatDialogRef<BasketDialogComponent>, private basketService: BasketService, private productService: ProductService, private orderService: OrderService, private categoryService: CategoryService) {}

  ngOnInit(): void {

    this.basketLoad();
    
   
    
  }

  //TODO: FIX IT 
  basketLoad(){
    setTimeout(() => {

      //TODO: якщо не працює корзина
     // this.sa = this.basketService.sa;
     this.basketService.productsAfterRemove.subscribe(
      res=>{
        if(res != null){
          res.forEach(el=>{
            if(el.discount > 0){
              el.price = Math.round(el.price - (el.price * (el.discount / 100)));
              el.totalProducPrice += el.price;
            }
          });


          this.sa = res;

        }
      }

     );
      if(this.sa != null){
        this.loading = false;
      }
      this.price();
    }, 500);
  }


  closeDialog(){
    this.dialog.close();
  }
/*
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
*/
/*
  getProducts(){
    if(localStorage.getItem('product') != null){
     this.products = JSON.parse(localStorage.getItem('product'));

     this.products = this.productInBasket();

     this.basketService.currentCounter(this.products);
     
    }
  }

*/
  chechDiscount(code: string, product: any){
      this.productService.checkDiscount(code).subscribe(

        res=>{
          if(res != null)
            product.discount = res;
            this.updateItem(product);
            this.basketLoad();
        }

      );
  }

  price(){
    this.totalPrice = 0;
    if(this.sa.length != 0 && this.sa != null){
      this.sa.forEach(el=>{

        
        if(el.discount > 0){
          this.totalPrice += el.totalProducPrice  - ( el.totalProducPrice * (el.discount / 100));
        }else{
          this.totalPrice += el.totalProducPrice;
        }
      });
    }
  }
  

  minusAmount(product: any){
    if(!(product.amount <= 1)){
      product.amount -= 1;
      product.totalProducPrice -= product.price;
      this.totalPrice -= product.price;
      this.updateItem(product);
    }else{
      this.notificationService.openSnackBar("Minimum 1 item");
    }
  }
  
  updateAmount(product: any, amount: any){
    if(!(product.amount > 100)){
      this.orderService.checkAmount(product.id, amount).subscribe(
        res=>{
          let sum = res * product.price;
          if(res === Number.parseInt(amount)){
            if(Number.parseInt(amount) >= res){
              product.totalProducPrice = sum;
              product.amount = res;
              this.updateItem(product);
            }else{
              product.amount = res;
            }
          }else{
            product.amount = res;
            product.totalProducPrice = sum;
          
            this.notificationService.openSnackBar("Maximum in the stock");
            
          }
          this.price();
   
        
        }

      );
    }else{
      product.amount = 99;
      product.totalProducPrice = product.amount * product.price;
      this.price();
      this.notificationService.openSnackBar("Maximum 99 items");
    }
  }
  
  //TODO: придумати як обмежувати макс кількість.
  plusAmount(product: any){
    if(!(product.amount >= 99)){
      product.amount += 1;
      this.orderService.checkAmount(product.id, product.amount).subscribe(
        res=>{
          if(res === product.amount){
            product.totalProducPrice += product.price;
            this.totalPrice += product.price;
            this.updateItem(product);
          }else{
            product.amount = res;
            this.notificationService.openSnackBar("Maximum in the stock");
          }
        }
      );
    }else{
      this.notificationService.openSnackBar("Maximum 99 items");
    }
  }



  updateItem(item: any){
    localStorage.setItem('product', JSON.stringify(this.sa));   
    this.basketService.sa = this.sa;
  }
  
  showForm(){
    this.showOrderForm = !this.showOrderForm;
  }

  sendOrder(){
    this.sa.forEach(el=>{
      this.order.items.push(el);
    });
    this.order.totalPrice = this.totalPrice;
    this.orderService.createOrder(this.order).subscribe(
      res=>{
        if(res != null){
          this.orderNumber = res;

          this.showOrderForm = false;
          this.sa = [];
          localStorage.setItem('product', JSON.stringify(this.sa));
          this.basketService.count.next(this.sa.length);
          this.price();
        }
      }

    );
  }
  /*

  productInBasket(): Product[]{
    let prod = [];      
            this.products.forEach(element => {
                
                this.productsFromDb.forEach(el=>{
                  if(element.id == el.id){
                    prod.push(element);
                  }
                });
             
            });

      return prod;
  }
  */


  remove(product: any){
    if(localStorage.getItem('product')!= null){
      if(this.sa.length != 0){
        this.sa = this.sa.filter(x=> x != product);
        if(product.amount > 1){
          this.totalPrice -= product.price * product.amount;
        }else{
          this.totalPrice -= product.price;
        }
        localStorage.setItem('product', JSON.stringify(this.sa));
        this.basketService.count.next(this.sa.length);
        this.basketService.productsAfterRemove.next(this.sa);
        this.basketService.remove();
      }
    }
  }

}
