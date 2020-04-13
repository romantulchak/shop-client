import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { TokenStorageService } from '../service/token-storage.service';
import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../dialogs/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
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
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private tokenService: TokenStorageService, private basketService: BasketService, private notificationService: NotificationService, private dialog: MatDialog) { }

  


  @Input() isCategory: boolean;
  @Input() categoryName: string;
  @Input() numberOfColumns:number = 4;
  @Input() showButtons = true;

  @Input() usualLook: boolean = false;
  @Input() topFiveLook: boolean = false;
  @Input() adminLook: boolean = false;

  @Input() productsFromComponent: Product[];


 // @Input() productOfDayLook: boolean;









  @Input() updateTopFive: Subject<boolean> = new Subject<boolean>();

  public gridStyle: any = {};


  



  productCheck: any[] = [];

  public styleOn = false;
  public currentProduct: Product;
  public isAdmin = false;
  public loading: boolean;
  @Input() products: Product[];
  


  ngOnInit(): void {
    this.isAdmin = this.tokenService.showAdminBoard;
    setTimeout(() => {
      this.productCheck =  this.basketService.sa;
      console.log(this.products);
      if(this.products === undefined){
        if(this.isCategory === true){
            this.findByCategory(); 
        }else{
            this.findAllProducts();
        }
      }

    }, 500);

    //TODO: пофіксити тут
    this.basketService.updateProducts.subscribe(
      res=>{
        if(res === true){
          this.basketService.productsAfterRemove.subscribe(
            res=>{
              if(res != null)
              {
                  this.productCheck = res;
              }
            }
          );

          if(this.isCategory === true){
              this.findByCategory();
          }else{
              this.findAllProducts();
          }
        }
      }
    );
    
    this.gridStyle={
      'grid-template-columns': `repeat(${this.numberOfColumns}, 1fr)`
    }
  }

  

  findAllProducts(){
    this.loading = true;
    this.productService.getProducts().subscribe(
      res=>{
        if(res != null){
          this.products = res;
          this.checkInBasket(res);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      }

    );
  }
  findByCategory(){
    this.loading = true;
    this.productService.filterByCategory(this.categoryName).subscribe(
      res=>{
        if(res != null){
          this.products = res;
          this.checkInBasket(res);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      },
      error=>{
        console.log(error);
      }

    );
  }

  checkInBasket(res: Product[]){
    res.forEach(e=>{
      setTimeout(() => {
        this.productCheck.forEach(el=>{
          if(e.id === el.id)
            e.showButton = el.showButton;
        });
      }, 500);
    });
  }

  mouseEnter(onStyle: boolean, product: Product){
    this.currentProduct = product;
    this.styleOn = onStyle;

  }
  mouseLeave(onStyle: boolean, product: Product){
    this.styleOn = onStyle;

  }
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(
      res=>{
        if(this.isCategory && this.categoryName != null){
          this.findByCategory();
        }else{
          this.findAllProducts();
        }
        this.notificationService.openSnackBar(res);
        this.basketService.getProductsFromDb();
        
      },
      error=>{console.log(error);}
    );
  }
  addToCart(product: Product){
    this.currentProduct = product;
    product.showButton = true;
    this.basketService.addToBasket(product);
    this.basketService.updateOrder.next(true);
    this.notificationService.openSnackBar("Added to your card " + product.productName);
  }

  filterCategory(res: any){
    this.loading = true;
    if(res != null){
      this.products = res;
      this.checkInBasket(this.products);
      setTimeout( () => {
        this.loading = false;
      }, 500);

    }
  }

  edit(product: Product){
    this.dialog.open(EditProductDialogComponent, {
      data: product
    });
  }

  

}
