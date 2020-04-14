import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../service/basket.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { Order } from '../../model/order.model';
import {OrderService} from '../../service/order.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../../main/main.component';
import { CategoryService } from '../../service/category.service';
import {Promo} from '../../model/enum/promo.enum';
import { NotificationService } from '../../service/notification.service';
import { BehaviorSubject } from 'rxjs';
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
          this.sa = res;
          //this.totalPrice =  this.basketService.price(res);
        }

      }
     );
      if(this.sa != null){
        this.loading = false;
      }
      this.basketService.totalPrice.subscribe(
        res=>{
          if(res != null)
            this.totalPrice = res;
        }

      );
      //this.price();
    }, 500);
  }

  price(){
    this.basketService.totalPrice.subscribe(

      res=>{
        if(res != null)
          this.totalPrice = Math.round(res);
      }

    );
  }

  closeDialog(){
    this.dialog.close();
  }
  chechDiscount(code: string, product: any){
    this.loading = true;
      this.productService.checkDiscount(code, product.id).subscribe(
        res=>{
          if(res != ''){
            if(res != Promo.UNCORRECTED_PRODUCT){
              if(res != Promo.EXPIRED){
                product.discount = res;
                product.discountPrice = Math.round(product.price - (product.price * (product.discount / 100)));
                product.promo = code;
                product.totalProducPrice = Math.round(product.discountPrice * product.amount);        
                this.updateItem(product);
        
                this.basketLoad();
                this.notificationService.openSnackBar('Ok');
            
              }else{
                this.notificationService.openSnackBar('Code is determined');
              }
            }else{
              this.notificationService.openSnackBar('The code isn\'t correct for this product');
            }
          }else{
            console.log(res);
            this.notificationService.openSnackBar(`Code: ${code} doesn't exist`);
          }
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
        
      );
  }
/*
  price(){
    this.totalPrice = 0;
    if(this.sa.length != 0 && this.sa != null){
      this.sa.forEach(el=>{
          this.totalPrice += el.totalProducPrice;
      });
      this.totalPrice = Math.round(this.totalPrice);
    }
  }
  */
  minusAmount(product: any){
    if(!(product.amount <= 1)){
      product.amount -= 1;
      
      if(product.discount > 0){
        product.totalProducPrice -= product.discountPrice;
        this.totalPrice -= product.discountPrice;
      }else{

        product.totalProducPrice -= product.price;
        this.totalPrice -= product.price;
      }

      this.updateItem(product);
    }else{
      this.notificationService.openSnackBar("Minimum 1 item");
    }
    this.basketService.totalPrice.next(this.totalPrice);
  }
  //TODO: баг ціна коли макс
  updateAmount(product: any, amount: any){
    if(!(product.amount > 100)){
      this.orderService.checkAmount(product.id, amount).subscribe(
        res=>{
          let sum = Math.round(res * product.price);
          let discountSum = Math.round(res * product.discountPrice);
          if(res === Number.parseInt(amount)){
            if(Number.parseInt(amount) >= res){
              if(product.discount > 0){
                product.totalProducPrice = discountSum;
              }else{
                product.totalProducPrice = sum;
              }
              product.amount = res;
              this.updateItem(product);
            }else{
              product.amount = res;
            }
          }else{
            product.amount = res;
            if(product.discount > 0){
              product.totalProducPrice = discountSum;
            }else{
              product.totalProducPrice = sum;
            }
            this.notificationService.openSnackBar("Maximum in the stock");
          }
          
          this.price();
          this.basketService.totalPrice.next(this.totalPrice);
          //this.totalPrice = this.basketService.price(this.sa);
        }

      );
    }else{
      product.amount = 99;
      product.totalProducPrice = product.amount * product.price;
      //this.totalPrice = this.basketService.price(this.sa);
      //this.basketService.totalPrice.next(this.totalPrice);
      
      this.updateItem(product);
      this.price();
      this.basketService.totalPrice.next(this.totalPrice);
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

            if(product.discount > 0){
              product.totalProducPrice += product.discountPrice;
              this.totalPrice += product.discountPrice;  
            }else{
            product.totalProducPrice += product.price;
            this.totalPrice += product.price;
            }
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
    this.basketService.totalPrice = new BehaviorSubject(this.basketService.price());
    this.basketService.updateOrder.next(true);
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
          //this.basketService.price(this.sa);
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
          if(product.discount > 0){
            this.totalPrice -= product.discountPrice * product.amount;
          }else{
            this.totalPrice -= product.price * product.amount;
          }
        }else{
          if(product.discount > 0){
            this.totalPrice -= product.discountPrice;
          }else{
            this.totalPrice -= product.price;
          }
        }
        localStorage.setItem('product', JSON.stringify(this.sa));
        this.basketService.count.next(this.sa.length);
        this.basketService.productsAfterRemove.next(this.sa);
        this.basketService.totalPrice.next(this.totalPrice);
        this.basketService.remove();
      }
    }
  }

}
