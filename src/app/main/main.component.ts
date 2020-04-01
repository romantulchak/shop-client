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
import { TokenStorageService } from '../service/token-storage.service';
import { NotificationService } from '../service/notification.service';
import { BrandService } from '../service/brand.service';
import { Brand } from '../model/brand.models';
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
  public brands: Brand[];
  constructor(private brandService: BrandService,  private notificationServcei: NotificationService, private toketnSerivce: TokenStorageService, private productService: ProductService,private orderService: OrderService, private basketService: BasketService, private categoryService: CategoryService, public dialog?: MatDialog) { }

  public isAdmin = false;
 
  productCheck: any[] = [];
  ngOnInit(): void {

    console.log('TEST');
    this.isAdmin = this.toketnSerivce.showAdminBoard;
    console.log(this.basketService.sa);
    setTimeout(() => {
      this.productCheck =  this.basketService.sa;
      this.getProducts();
      this.getCategories();
      this.getAllBrands();

   }, 500);

    



    this.basketService.updateProducts.subscribe(
      res=>{
        if(res === true){
          
          this.basketService.productsAfterRemove.subscribe(

            res=>{
              if(res != null)
                this.productCheck = res;
            }

          );


          this.getProducts();
          
        }
      }
  
    );

  



  }
  getAllBrands(){
    this.brandService.getAllBrands().subscribe(

      res=>{
        if (res != null) {
          this.brands = res;
          console.log(res);
        }
        
      }

    );
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
           if(res != null){
            this.products = res;
            res.forEach(e=>{
             
              setTimeout(() => {
                this.productCheck.forEach(el=>{
                  if(e.id === el.id){
                    e.showButton = el.showButton;
                  }
               });
              });
              }, 1000);






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
    product.showButton = true;
    this.basketService.addToBasket(product);
    this.notificationServcei.openSnackBar("Added to your card " + product.productName);
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
