import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { AlertDialog } from './../model/alert-dialog';
import { Compromisso } from './../model/compromisso';
import { AgendaService } from './../services/agenda.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailsCompromissoDialogComponent } from '../details-compromisso-dialog/details-compromisso-dialog.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'inicio', 'fim', 'detalhe'];
  dataSource:Compromisso[];// = ELEMENT_DATA;
  constructor(private agendaService: AgendaService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.agendaService.list()
    .subscribe(success => {
      console.log(success);
      this.dataSource = success;
      // reseta o form
      // this.formulario.reset();
      // this.resetar();
    },
    error=>{
      console.error(error);
      this.openAlertDialog(new AlertDialog("erro","Atenção!",["Erro inesperado no servidor",error.message]));
    } 
    )
  }

  
  openAlertDialog(alert: AlertDialog): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: alert
    });
  }

  openDialog(compromisso): void {
    const dialogRef = this.dialog.open(DetailsCompromissoDialogComponent, {
      width: '400px',
      data: compromisso
    });

  }
}
