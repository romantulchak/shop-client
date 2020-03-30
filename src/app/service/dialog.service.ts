import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


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
}

