import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './product/details/details.component';
import { BasketComponent } from './basket/basket.component';


const routes: Routes = [

  {path: '', component:MainComponent},
  {path: 'createProduct', component: CreateProductComponent},
  {path: 'createCategory', component: CategoryComponent},
  {path: 'detailsProduct/:id', component: DetailsComponent},
  {path: 'basket', component: BasketComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
