import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { TokenStorageService } from '../service/token-storage.service';
import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../dialogs/edit-product-dialog/edit-product-dialog.component';
import { RemindMeDialogComponent } from '../dialogs/remind-me-dialog/remind-me-dialog.component';
import { DialogService } from '../service/dialog.service';
import { Brand } from '../model/brand.model';
import { Cpu } from '../model/cpu.model';
import { Gpu } from '../model/gpu.model';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fullWidth',[
      state('max', style({
        color: '#5677fc',
      })),
      state('min', style({
        color: '#000'
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
export class ProductsComponent implements OnInit, OnChanges {

  constructor(private productService: ProductService, private tokenService: TokenStorageService, private basketService: BasketService, private notificationService: NotificationService, private dialogService: DialogService, private brandService: BrandService) { }

  public brandsToSend: string[] = [];
  public cpusToSend: string[] = [];
  public gpusToSend: string[] = [];
  public brands: Brand[];
  public cpus: Cpu[];
  public gpus: Gpu[];
  public visitedProductsArray: Product[] = [];

  @Input() isCategory: boolean;
  @Input() categoryName: string;
  @Input() numberOfColumns:number = 4;
  @Input() showButtons = true;
  @Input() usualLook: boolean = false;
  @Input() topFiveLook: boolean = false;
  @Input() adminLook: boolean = false;


 // @Input() productOfDayLook: boolean;
  public gridStyle: any = {};






  productCheck: any[] = [];

  public styleOn = false;
  public currentProduct: Product;
  public isAdmin = false;
  public loading: boolean = false;


  @Input() pr: Product[];

  @Input() products: Product[];



  ngOnInit(): void {
    this.isAdmin = this.tokenService.showAdminBoard;
      setTimeout(() => {
        this.setProducts();
      }, 500);
      this.getAllGpus();
      this.getAllCpus();
      this.getAllBrands();
    this.gridStyle={
      'grid-template-columns': `repeat(${this.numberOfColumns}, 1fr)`
    }
  }




  setProducts(){
    this.products = this.pr;
    if(this.pr === undefined || this.pr===null){
      if(this.isCategory === true){
        this.findByCategory();
      }else{
        this.findAllProducts();
      }
      console.log(this.products);

    }



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
          if(this.pr === undefined){
            if(this.isCategory === true){
                this.findByCategory();
            }else{
                this.findAllProducts();
            }
          }
          else{
            this.checkInBasket(this.pr);
            this.products = this.pr;
          }
        }
      }
    );
  }



  ngOnChanges(){
    this.basketService.updateProducts.subscribe(
      res=>{
        if(res === true){
          this.products = this.pr;
        }
      }
    );
    this.findByCategory();
  }

  findAllProducts(){
    this.loading = true;
    this.productService.getProducts().subscribe(
      res=>{
        if(res != null){
          this.products = res;
          console.log(res);

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
          console.log(res);

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
    this.productCheck =  this.basketService.sa;
    res.forEach(e=>{
      setTimeout(() => {
        this.productCheck.forEach(el=>{
          if(e.id === el.id){
            e.showButton = el.showButton;
          }
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
        this.notificationService.success(res);
        this.basketService.getProductsFromDb();

      },
      error=>{console.log(error);}
    );
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

    const dialog = this.dialogService.editProductDialog(product);
    dialog.afterClosed().subscribe(
      res=>{
        this.findAllProducts();
      }
    );
  }

  addToVisited(product: Product){
    if(localStorage.getItem('visited') != null){

      this.visitedProductsArray = JSON.parse(localStorage.getItem('visited'));

      if((this.visitedProductsArray.filter(x=>x.id === product.id).length == 0)){

        this.visitedProductsArray.push(product);
        localStorage.setItem('visited', JSON.stringify(this.visitedProductsArray));
      }
    }else{
      this.visitedProductsArray.push(product);
      localStorage.setItem('visited', JSON.stringify(this.visitedProductsArray));
    }
  }



  filter(brandName?: string, cpuName?: string, gpuName?: string){
    this.loading = true;
    if(brandName != null){
      if(!this.brandsToSend.includes(brandName)){
        this.brandsToSend.push(brandName);
      }else{
        this.brandsToSend = this.brandsToSend.filter(e=>e != brandName);
      }
    }
    if(cpuName != null){
      if(!this.cpusToSend.includes(cpuName)){
        this.cpusToSend.push(cpuName);
      }else{
        this.cpusToSend = this.cpusToSend.filter(e=>e != cpuName);
      }
    }
    if(gpuName != null){
      if(!this.gpusToSend.includes(gpuName)){
        this.gpusToSend.push(gpuName);
      }else{
        this.gpusToSend = this.gpusToSend.filter(e=>e != gpuName);
      }
    }
    this.productService.filter(this.brandsToSend, this.cpusToSend, this.gpusToSend).subscribe(
      res=>{
        if(res !=null){
          this.filterCategory(res);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      },
      error=>{
        console.log('error');
      }
    );
  }

  getAllGpus(){
    this.productService.getAllGpus().subscribe(
      res=>{
        if(res != null)
          this.gpus = res;
      },
      error=>{
        console.log(error);
      }
    );
  }

  getAllCpus(){
    this.productService.getAllCpus().subscribe(

      res=>{
        if(res != null)
          this.cpus = res;
      },
      error=>{
        console.log(error);
      }

    );
  }

  getAllBrands(){
    this.brandService.getAllBrands().subscribe(

      res=>{
        if (res != null) {
          this.brands = res;
        }

      }

    );
  }
}
