import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { BasketService } from '../service/basket.service';
import { ProductService } from '../service/product.service';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public products: Product[] = [];
  public productsFromDb: Product[] = [];
  public sa: any[] = [];
  public totalPrice: number = 0;
  public showOrderForm = false;
  public orderNumber: string;


  //TEST form
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  

  public order: Order = {
    id: null,
    items: [],
    //productsId: [],
    //amounts: [],
    email: null,
    costumerAddress: null,
    costumerCity: null,
    costumerLastName: null,
    costumerName: null,
    customerMobilePhone: null,
    customerPostalCode: null,
    totalPrice: null,
    isBeingProcessed: true,
    atTheDestination: false,
    inTransit: false,
    isCompleted: false,
    received: false
  }

  constructor(private basketService: BasketService, private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
      setTimeout(() => {
        this.sa = this.basketService.sa;
        this.price();
      }, 500);
   
    
    
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
  price(){
      if(this.sa.length != 0 && this.sa != null){
        this.sa.forEach(el=>{
            if(el.amount > 1){
              for(let i = 0; i < el.amount; i++){
                this.totalPrice += el.price;
              }
            }else{
              this.totalPrice += el.price;
            }
             
          });        
          
      }else{
        this.totalPrice = 0;
      }
  }
  

  minusAmount(product: any){
    if(!(product.amount <= 1)){
      product.amount -= 1;
      this.totalPrice -= product.price;
      this.updateItem(product);
    }else{
      console.log('Min 1');
    }
  }
  plusAmount(product: any){
    if(!(product.amount >= 10)){
      product.amount += 1;
      this.totalPrice += product.price;
      this.updateItem(product);
    }else{
      console.log('Max 10');
    }
  }



  updateItem(item: any){
    localStorage.setItem('product', JSON.stringify(this.sa));   
  }
  
  showForm(){
    this.showOrderForm = !this.showOrderForm;
  }

  sendOrder(){
    this.sa.forEach(el=>{
      this.order.items.push(el);
    });

    this.order.totalPrice = this.totalPrice;
  
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe(


      res=>{
        if(res != null){
          this.orderNumber = res;
          console.log(res);
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

  //TODO: зробити норм видалення
  remove(product: any){
    if(localStorage.getItem('product')!= null){
      if(this.sa.length != 0){
        console.log('sadasdasdsad');
        
        
       
        for(let el of this.sa){
          console.log(el.id);
          if(product.id === el.id){
            this.sa.splice(this.sa.indexOf(product.id), 1);
            break;
          }
        }
        if(product.amount > 1){
          for(let i = 0; i < product.amount; i++){
            this.totalPrice -= product.price;
          }
        }else{
          this.totalPrice -= product.price;
        }
        
        localStorage.setItem('product', JSON.stringify(this.sa));
        //
        this.products =  this.basketService.products;
        //

        this.basketService.count.next(this.sa.length);
        //this.basketService.updateCart();
      }
    }
  }
}
