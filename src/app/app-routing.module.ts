import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './product/details/details.component';
import { BasketComponent } from './basket/basket.component';
import { OrderComponent } from './order/order.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationGuard } from './guards/registration-guard.service';
import { BrandComponent } from './brand/brand.component';


const routes: Routes = [

  {path: '', component:MainComponent},
  {path: 'createProduct', component: CreateProductComponent, 
          canActivate: [AuthGuard], 
          data:{role: 'ROLE_ADMIN'}},
  {path: 'createCategory', component: CategoryComponent, 
              canActivate: [AuthGuard], 
              data:{role: 'ROLE_ADMIN'}},
  {path: 'detailsProduct/:id', component: DetailsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'orders', component: OrderComponent,
              canActivate: [AuthGuard], 
              data:{role: 'ROLE_ADMIN'}
  },
  {path: 'registration', component: RegistrationComponent, canActivate: [RegistrationGuard]},
  {path: 'profile', component: ProfileComponent,
                    canActivate: [AuthGuard], 
                    data:{role: 'ROLE_USER'},
  },
  {path: 'brands', component: BrandComponent, canActivate: [AuthGuard], data: {role: 'ROLE_ADMIN'}},
  { path: 'admin', component: BoardAdminComponent, 
              canActivate: [AuthGuard], 
              data:{role: 'ROLE_ADMIN'}
  },
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
