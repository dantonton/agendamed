import { AlertDialog } from './../model/alert-dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
selector: 'app-alert-dialog',
templateUrl: './alert-dialog.component.html',
styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {

  constructor( public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog
    ) {
      console.log(data);
     }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
}

