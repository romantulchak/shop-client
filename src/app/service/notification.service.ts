import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }
  
  openSnackBar(message: string, className: string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "right";
    config.duration = 5000;
    config.panelClass = [className]; 
    this.snackBar.open(message, "Ok", config);
  }

  success(message: string){
    this.openSnackBar(message, 'successMessage');
  }
  error(message: string){
    this.openSnackBar(message, 'errorMessage');
  }

}
