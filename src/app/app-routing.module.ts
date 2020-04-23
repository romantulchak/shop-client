import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/templates/app-component/app.component';
import { MainComponent } from './main/main.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './product/details/details.component';
import { BasketComponent } from './basket/basket.component';
import { OrderComponent } from './order/order.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from '../app/templates/admin-component/board-admin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationGuard } from './guards/registration-guard.service';
import { BrandComponent } from './brand/brand.component';
import { CpuComponent } from './cpu/cpu.component';
import { GpuComponent } from './gpu/gpu.component';
import { ProductComponent } from './product/product.component';
import { OpinionsComponent } from './product/details/opinions/opinions.component';
import { AllAboutProductComponent } from './product/details/all-about-product/all-about-product.component';
import { ProductFeaturesComponent } from './product/details/product-features/product-features.component';


const routes: Routes = [

  {path: '', component:MainComponent},
  {path: 'createProduct', component: CreateProductComponent, 
          canActivate: [AuthGuard], 
          data:{role: 'ROLE_ADMIN'}},
  {path: 'createCategory', component: CategoryComponent, 
              canActivate: [AuthGuard], 
              data:{role: 'ROLE_ADMIN'}},

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
  { path: 'cpus', component: CpuComponent, 
  canActivate: [AuthGuard], 
  data:{role: 'ROLE_ADMIN'}
  },
  { path: 'gpus', component: GpuComponent, 
  canActivate: [AuthGuard], 
  data:{role: 'ROLE_ADMIN'}
  },
  {path: 'category/:categoryName', component: ProductComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
