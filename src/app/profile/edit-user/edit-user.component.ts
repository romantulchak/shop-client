import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';
import { ProfileService } from '../../service/profile.service';
import { NotificationService } from '../../service/notification.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, @Inject(MAT_DIALOG_DATA) public user: User, private profileService: ProfileService, private dialogRef: MatDialogRef<EditUserComponent>, private notificationService: NotificationService) { }

  ngOnInit(): void {
   
  }
  editUser(){
    this.profileService.editUser(this.user).subscribe(

      res=>{
        this.tokenStorage.saveUser(this.user);
        this.notificationService.openSnackBar(res);
        this.dialogRef.close();
      }

    );
  }
  
}
