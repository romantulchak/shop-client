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




  constructor(public tokenStorageService: TokenStorageService ,private dialog: MatDialog, private orderService: OrderService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.tokenStorageService.logged();
    this.getCategories();

  }



     //TODO: дублювання в OrderComponent
  search(){
    this.orderService.findByIdentificationNumber(this.identificationNumberForSeach).subscribe(
      res=>{

          this.dialog.open(DialogSearchComponent,{
            data: {
              data: res
            }
          });

      },
      error=>{
        console.log(error);
      }
    );
      /*setTimeout(() => {
        this.basketService.count.subscribe(
          res=>{
              if(res != null){
                this.basketLength = res;
              }
          }
        );
      }, 500);*/
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
