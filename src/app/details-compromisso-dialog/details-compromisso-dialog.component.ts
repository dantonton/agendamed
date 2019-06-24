import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { AgendaService } from '../services/agenda.service';
import { AlertDialog } from '../model/alert-dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-details-compromisso-dialog',
  templateUrl: './details-compromisso-dialog.component.html',
  styleUrls: ['./details-compromisso-dialog.component.scss']
})
export class DetailsCompromissoDialogComponent {

  constructor(public dialogRef: MatDialogRef<DetailsCompromissoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public agendaService: AgendaService,
    public dialog: MatDialog,
    public location: Location
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(): void {

    this.agendaService.delete(this.data.id)
      .subscribe(
        success => {
          console.log(success);
          if (success.type == 0) {
            this.openAlertDialog(new AlertDialog("erro", "Atenção!", success.erros.map(x => x['message'])))
            .subscribe(result => {
              location.reload();
            });
          } else {
            this.openAlertDialog(new AlertDialog("sucess", "Excluído!", ["Compromisso excluído com sucesso!"]))
              .subscribe(result => {
                location.reload();
              });

          }
        },
        error => {
          console.error(error);
          this.openAlertDialog(new AlertDialog("erro", "Atenção!", ["Erro inesperado no servidor", error.message]))
          .subscribe(result => {
            location.reload();
          });
        }
      );
  }
  
  openAlertDialog(alert: AlertDialog): Observable<any> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: alert
    });
    return dialogRef.afterClosed();
  }
}
