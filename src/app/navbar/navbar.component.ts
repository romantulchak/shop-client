import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../dialogs/basket-dialog/basket-dialog.component';
import { OrderService } from '../service/order.service';
import { DialogSearchComponent } from '../dialogs/dialog-search/dialog-search.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { TokenStorageService } from '../service/token-storage.service';
import { DialogService } from '../service/dialog.service';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],


})
export class NavbarComponent implements OnInit {

  public identificationNumberForSeach: string;
  public showAllCategories: boolean = false;
  public categories: Category[];
  public currentCategory: Category;
  public showSubcategory:boolean = false;


  constructor(public tokenStorageService: TokenStorageService ,private dialog: MatDialog, private orderService: OrderService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.tokenStorageService.logged();
    this.getCategories();

  }


  public showSubcategories(category:Category){
    if(category.subcategories.length > 0){
      this.currentCategory = category;
      this.showSubcategory = true;
    }else{
      this.currentCategory = null;
      this.showSubcategory = false;
    }
  }
  public hideCategories(){
    this.currentCategory = null;
    this.showSubcategory = false;
    this.showAllCategories = false;
  }





  getCategories(){

    this.categoryService.getCategories().subscribe(
      res=>{
        if(res != null){
          this.categories = res;
          console.log(res);

        }
      },
      error=>{
        console.log(error);
      }
    );
  }




}
