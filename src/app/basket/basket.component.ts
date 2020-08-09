import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { BasketService } from '../service/basket.service';
import { ProductService } from '../service/product.service';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { FormGroup } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { DialogService } from '../service/dialog.service';
import { NovaPoshtaService } from '../service/novaPoshta.service';
import { CustomCourier } from '../model/customCourier.model';
import { CustomPostOffice } from '../model/customPostOffice.model';

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
  public user: User;
  public isLoading = true;

  public cities: any[];
  public deliveryOffice:boolean = true;
  public deliveryCourier:boolean;
  public currentCity:any;
  public departaments: any[];
  public currentDepartment: any;
  public department:any;

  public customCourierDelivery: CustomCourier = new CustomCourier();
  public order: Order = {
    id: null,
    items: [],
    email: null,
    statuses: null,
    costumerAddress: null,
    costumerLastName: null,
    costumerName: null,
    customerMobilePhone: null,
    totalPrice: null,
    user: new User(),
    costumerCourier: null,
    customPostOffice: null
  }

  constructor(private dialogService: DialogService, private basketService: BasketService, private productService: ProductService, private orderService: OrderService, public tokenStorage: TokenStorageService, private novaPoshtaService: NovaPoshtaService) {}

  ngOnInit(): void {

      this.basketUpdate();

      this.basketService.updateOrder.subscribe(
        res=>{
          this.isLoading = true;
          if(res === true){
            this.price();

            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
        }
      );
  }

  basketUpdate(){
    let isLoggedIn = !! this.tokenStorage.getToken();


      setTimeout(() => {
        this.sa = this.basketService.sa;
        this.price();
        this.isLoading = false;
      }, 500);
      this.autoComplete(isLoggedIn);
  }
  loginDialog(){
    this.dialogService.loginDialog();
  }


  autoComplete(isLoggedIn: boolean){
    if(isLoggedIn){
      this.user = this.tokenStorage.getUser();
      this.order.user.id = this.user.id;
      this.order.user.username = this.user.username;
      this.order.user.email = this.user.email;
      this.order.costumerName = this.user.firstName;
      this.order.costumerLastName = this.user.lastName;
      this.order.costumerAddress = this.user.address;
      this.order.customerMobilePhone = this.user.mobilePhone;
      this.order.email = this.user.email;
    }
  }

  public selectDelivery(type: string){
    switch(type){
      case "1":
        this.deliveryOffice = true;
        this.deliveryCourier = false;
        break;
      case "2":

        this.deliveryOffice = false;
        this.deliveryCourier = true;
        this.currentDepartment = null;
        this.department = null;
        break;
    }
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
    setTimeout(() => {
      this.basketService.totalPrice.subscribe(
        res=>{
          if(res != null)
            this.totalPrice = res;

            this.getNovaPoshtaCities();
        }
      );
    }, 500);
  }





  showForm(){
    this.showOrderForm = !this.showOrderForm;
  }

  //TODO: ПІСЛЯ ПОКУПКИ ВИДАЛЯТИ ВСІ ПРЕДМЕТИ З КОРЗИНИ
  sendOrder(){
    this.sa.forEach(el=>{
      this.order.items.push(el);
      el.showButton = false;
    });
    this.order.totalPrice = this.totalPrice;
      this.order.costumerCourier = this.customCourierDelivery;
    if(this.deliveryCourier){
      this.order.costumerCourier.costumerCity = this.currentCity;
    }else if(this.deliveryOffice){
      this.order.customPostOffice = new CustomPostOffice(this.department.Description, this.department.CityDescription);
    }
      this.orderService.createOrder(this.order).subscribe(
        res=>{
          this.orderNumber = res;
          console.log(res);
          this.showOrderForm = false;
          this.sa = [];
          localStorage.setItem('product', JSON.stringify(this.sa));
          this.basketService.productsAfterRemove.next(this.sa);
          this.basketService.count.next(this.sa.length);
          this.basketService.totalPrice.next(0);
          this.price();
        }
      );


  }

  private getNovaPoshtaCities(){
    this.novaPoshtaService.getCities().then(
      res=>{
        return res.json();
      }
    ).then(
      res=>{
        this.cities = res.data;
      }
    );
  }
  public async getNovaPoshtaDepartaments(){

   await this.novaPoshtaService.getNovaPoshtaDepartaments(this.currentCity).then(
      res=>{
        return res.json();
      }
    ).then(
      res=>{
        this.departaments = res.data;
        this.department = this.departaments[0];
      }
    );

  }
  public changeDepartament(){
    this.department  = JSON.parse(this.currentDepartment);
  }
}
