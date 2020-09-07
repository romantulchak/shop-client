import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Brand } from 'src/app/model/brand.model';
import { BrandService } from 'src/app/service/brand.service';
import { Cpu } from 'src/app/model/cpu.model';
import { Gpu } from 'src/app/model/gpu.model';
import { Sections } from 'src/app/model/sections.model';
import { Field } from 'src/app/model/field.model';
import { FormBuilder } from '@angular/forms';
import { Subcategory } from 'src/app/model/subcategory.model';
import { SubcategoryService } from 'src/app/service/subcategory.service';
import { DialogService } from 'src/app/service/dialog.service';
import { BasketService } from 'src/app/service/basket.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  public showButton = true;
  public notify: boolean = false;
  public selectedFiles: File[];


  public dictionary: Map<string, Map<string, string>>= new Map();

  private valueMap = new Map<string, string>()

  public categoryFields: Sections[] = [];

  public mapToSend: Map<string, Map<string, string>> = new Map();
  public id:number;
  public subcategoryId: number;
  public products: Product[];

  public product: Product = {
    id:null,
    productName: '',
    category: {
      id:1,
      categoryName: '',
      product: null,
    },
    description: '',
    image: null,
    productPrice: 0,
    brand: new Brand(),
    amountInStock: 0,
    cpu: new Cpu(),
    gpu: new Gpu(),
    discountPrice: 0,
    isGlobalDiscount: false,
    subcategory: new Subcategory()
  };

  public currentCategory: Category;
  public currentSubcategory: Subcategory;
  public category: Category[];
  public brands: Brand[];
  public cpus: Cpu[];
  public currentCpu: Cpu = new Cpu();
  public gpus: Gpu[];
  public currentGpu: Gpu = new Gpu();
  constructor(private notificiationService: NotificationService, private basketService: BasketService, private dialogService: DialogService, private brandService: BrandService,private subcategoryService: SubcategoryService, private notificationService: NotificationService, private categoryService: CategoryService, private productService: ProductService, public fb: FormBuilder) { }

  ngOnInit(): void {
    //this.getCategories();
    this.getSubcategories();
    this.getBrands();
    this.getAllCpus();
    this.getAllGpus();
    this.getProducts();
  }
  private getSubcategories(){
    this.categoryService.getCategories().subscribe(
      res=>{
        if(res != null){
          this.category = res;
          if(res.length == 0){

            this.showButton = false;
          }else{
            this.showButton = true;
          }
        }
      }
    );
  }


  /*

  public getCategories(){
    this.categoryService.getCategories().subscribe(

      res=>{
          this.category = res;
          if(res.length == 0){

            this.showButton = false;
          }else{
            this.showButton = true;
          }
      },
      error=>{
        console.log(error);
      }
    );
  }*/
  public getAllCpus(){
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
  public getAllGpus(){
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


  public createProduct(){
    this.productService.pushImage(this.selectedFiles).subscribe(
      res=>{
        console.log(res);
      },
      error=>{console.log(error);}

    );

    const convMap = this.mapToSend;
    this.dictionary.forEach((value, key)=>{
      let s = new Map<string, string>();
       let map = new Map();
        value.forEach((v, k) =>{
          s[k]= v;

        });
        convMap[key] = s;
    });
    this.product.properties = convMap;
    this.product.subcategory = this.currentSubcategory;
    this.product.category = this.currentCategory;
    console.log(this.product);
    this.productService.createProduct(this.product, this.notify).subscribe(
          res=>{
            this.notificationService.success(res);
          },
          error=>{
            console.log(error);
          }

      );
  }
  showCpuDetails(){
    this.cpus.forEach(e=>{
      if(e.id == this.product.cpu.id){
        this.currentCpu = e;
      }
    });
  }
  showGpuDetails(){
    this.gpus.forEach(e=>{
      if(e.id == this.product.gpu.id){
        this.currentGpu = e;
      }
    });
  }

  handleImages(event){
    this.selectedFiles = event.target.files;
  }
  getBrands(){
    this.brandService.getAllBrands().subscribe(
      res=>{
        if(res != null){
          this.brands = res;
        }
      }
    );
  }

  public showCategories(){
    let c = this.category.filter(x=>x.id == this.id)[0];
    this.subcategoryId = null;
    this.currentSubcategory = null;
    this.categoryFields = [];
    if(c != null){
      this.currentCategory = c;
      if(c.sectionsInDb.length > 0){
        this.categoryFields = c.sectionsInDb;
      }
    }
  }
  public showSubcategories(){
    let subcategory = this.currentCategory.subcategories.filter(x=>x.id == this.subcategoryId)[0];
    if(subcategory != null){
      this.currentSubcategory = subcategory;
      if(subcategory.sectionsInDb.length > 0){
       this.categoryFields = [];
       this.categoryFields = subcategory.sectionsInDb;
      }
    }
  }


  setValue(fieldName:string ,fieldFromClient: any, value:string){
    let field = new Field();
    field.fieldName = fieldFromClient.name;
    field.fieldValue = value;

    this.valueMap.set(fieldFromClient.name, value);
    this.dictionary.set(fieldName, this.valueMap);
    console.log(this.dictionary);
  }
  saveValues(){
    this.valueMap = new Map<string, string>();
  }
  addPromo(product: Product,percent: string,numberOfDays: any, numberOfUses: string){
    this.productService.addPromo(product,  Number.parseInt(percent),Number.parseInt(numberOfDays),  Number.parseInt(numberOfUses)).subscribe(

      res=>{
        this.notificiationService.success(res);
        this.getProducts();
      }

    );
  }
  private getProducts(){
    this.productService.getProducts().subscribe(

      res=>{
        console.log(res);
        if(res != null)
          this.products = res;
      },
      error=>{
        console.log(error);
      }

    );
  }

  edit(product: Product){

    const dialog = this.dialogService.editProductDialog(product);
    dialog.afterClosed().subscribe(
      res=>{
        this.getProducts();
      }
    );
  }
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(
      res=>{
       
          this.getProducts();
        
        this.notificationService.success(res);
        this.basketService.getProductsFromDb();

      },
      error=>{console.log(error);}
    );
  }
}
