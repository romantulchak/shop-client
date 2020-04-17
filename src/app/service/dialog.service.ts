import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { User } from '../model/user.model';
import { EditUserComponent } from '../profile/edit-user/edit-user.component';
import { Product } from '../model/product.model';
import { EditProductDialogComponent } from '../dialogs/edit-product-dialog/edit-product-dialog.component';
import { RemindMeDialogComponent } from '../dialogs/remind-me-dialog/remind-me-dialog.component';


@Injectable({
    providedIn:'root'
})
export class DialogService{


    constructor(private dialog: MatDialog){}
    
    public loginDialog(){
        this.dialog.open(LoginDialogComponent, {
            panelClass: 'dialog__login'
        })
    }
    public editUserDialog(user: User){
        this.dialog.open(EditUserComponent, {
            data: user,
            panelClass:'dialog__edit_user'
        });
    }
    public editProductDialog(product: Product): MatDialogRef<EditProductDialogComponent>{
          
    const dialog = this.dialog.open(EditProductDialogComponent, {
        data: product.id
      });
      
     return dialog;
      
    }

  remindMeDiaglog(product: Product){
    this.dialog.open(RemindMeDialogComponent, {
      data: product
    })
  }

}

