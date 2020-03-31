import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { User } from '../model/user.model';
import { EditUserComponent } from '../edit-user/edit-user.component';


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
}

