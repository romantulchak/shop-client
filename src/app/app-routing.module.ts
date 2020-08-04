import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './product/details/details.component';
import { BasketComponent } from './basket/basket.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationGuard } from './guards/registration-guard.service';
import { ProductComponent } from './product/product.component';
import { OpinionsComponent } from './product/details/opinions/opinions.component';
import { AllAboutProductComponent } from './product/details/all-about-product/all-about-product.component';
import { ProductFeaturesComponent } from './product/details/product-features/product-features.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MainComponent } from './main/main.component';
import { BoardAdminComponent } from './templates/admin-component/board-admin.component';
import { CpuComponent } from './cpu/cpu.component';
import { GpuComponent } from './gpu/gpu.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { BrandComponent } from './brand/brand.component';
import { ShopComponent } from './shop/shop.component';
import { AdminDashboardComponent } from './templates/admin-component/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
    {path: '', component: ShopComponent, children:[
      {path: '', component:MainComponent},
      //TODO: CHECK IF ID IS INVALID
       {path: 'detailsProduct/:id', component: DetailsComponent, children:[
        {
          path: '',
          redirectTo: 'all',
          pathMatch:'full'
        },
        {
          path: 'opinions',
          component: OpinionsComponent
        },
        {
          path:'all',
          component: AllAboutProductComponent
        },
        {
          path: 'features',
          component: ProductFeaturesComponent
        },
        {
          path: 'detailsProduct/**',
          component: NotFoundComponent
        }
      ]},
      {path: 'basket', component: BasketComponent},
      {path: 'registration', component: RegistrationComponent, canActivate: [RegistrationGuard]},
      {path: 'profile', component: ProfileComponent,
                        canActivate: [AuthGuard],
                        data:{role: 'ROLE_USER'},
      },//
      {path: 'category/:categoryName', component: ProductComponent},

    ]},

    { path: 'admin', component: BoardAdminComponent,
    canActivate: [AuthGuard],
    data:{role: 'ROLE_ADMIN'},
    children:[
      {path: '',  redirectTo:'dashboard',pathMatch: 'full'},
      {path: 'dashboard', component:AdminDashboardComponent, canActivate:[AuthGuard], data: {role: 'ROLE_ADMIN'}},
      {path:'subcategory', component:SubcategoryComponent,canActivate: [AuthGuard],data:{role: 'ROLE_ADMIN'}},
      { path: 'gpus', component: GpuComponent,
      canActivate: [AuthGuard],
      data:{role: 'ROLE_ADMIN'}
      },
      { path: 'cpus', component: CpuComponent,
      canActivate: [AuthGuard],
      data:{role: 'ROLE_ADMIN'}
      },
      {path: 'brands', component: BrandComponent, canActivate: [AuthGuard], data: {role: 'ROLE_ADMIN'}},
      {path: 'orders', component: OrderComponent,
                canActivate: [AuthGuard],
                data:{role: 'ROLE_ADMIN'}
      },
      {path: 'createProduct', component: CreateProductComponent,
      canActivate: [AuthGuard],
      data:{role: 'ROLE_ADMIN'}},
      {path: 'createCategory', component: CategoryComponent,
          canActivate: [AuthGuard],
          data:{role: 'ROLE_ADMIN'}},
    ]
    },




  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
