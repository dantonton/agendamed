import { Compromisso } from './../model/compromisso';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { Location } from '@angular/common';

import { AgendaService } from '../services/agenda.service';
import { ActivatedRoute } from '@angular/router';
import { AlertDialog } from '../model/alert-dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-agenda-editar',
  templateUrl: './agenda-editar.component.html',
  styleUrls: ['./agenda-editar.component.scss']
})
export class AgendaEditarComponent implements OnInit {
  
  startDate = new Date(1990, 0, 1);

  formulario: FormGroup;


  matcher = new MyErrorStateMatcher();
  constructor(
      private formBuilder: FormBuilder,
      private agendaService: AgendaService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      public location: Location
    ) { }

  ngOnInit() {
    if(this.route.params['id']){

      this.route.params
      .pipe(
        map((params: any) =>params['id']),
        switchMap(id => this.agendaService.getByID(id))
      )
      .subscribe(compromisso => this.updateForm(compromisso));
    }
    

    this.formulario = this.formBuilder.group({
      id: [null],
      paciente: ['', [Validators.required, Validators.maxLength(255)]],
      nascimento: ['', Validators.required],
      inicio: ['', [Validators.required]],
      fim: ['', [Validators.required, this.minTo()]],
      inicio_h: ['', [Validators.required]],
      fim_h: ['', [Validators.required, this.minTo()]],
      inicio_m: ['', [Validators.required]],
      fim_m: ['', [Validators.required, this.minTo()]],
      observacao: ['', Validators.maxLength(5000)],
    });
  }

  updateForm(compromisso: Compromisso){
    
    const inicio = new Date(compromisso.inicio);
    const fim = new Date(compromisso.fim);
    this.formulario.patchValue(
      {
        id : compromisso.id,
        paciente : compromisso.nome,
        nascimento : compromisso.nascimento,
        inicio : compromisso.inicio,
        fim : compromisso.fim,
        inicio_h : inicio.getHours(),
        fim_h : fim.getHours(),
        inicio_m : inicio.getMinutes(),
        fim_m : fim.getMinutes(),
        observacao : compromisso.observacao,
      }
    )
  }

  onSubmit() {
    const compromisso = this.toVM();
    this.agendaService.save(compromisso)
    .subscribe(
      success => {
        console.log(success);
        if(success.type == 0){
          this.openAlertDialog(new AlertDialog("erro","Atenção!",success.erros.map(x=>x['message'])));  
        }else{
          this.openAlertDialog(new AlertDialog("sucess","Concluído!",["Seus dados foram salvos com sucesso!"]))
          .subscribe(result => {
            this.location.back();
          });
          
        }
      },
      error=>{
        console.error(error);
        this.openAlertDialog(new AlertDialog("erro","Atenção!",["Erro inesperado no servidor",error.message]));
      } 
    );
                
    
  }

  toVM():Compromisso{
    let c = new Compromisso();
    c.id = this.formulario.get('id').value;
    c.nome = this.formulario.get('paciente').value;
    c.nascimento = new Date(this.formulario.get('nascimento').value);
    c.inicio = new Date(this.formulario.get('inicio').value);
    c.fim = new Date(this.formulario.get('fim').value);
    c.inicio.setHours( this.formulario.get('inicio_h').value)
    c.fim.setHours(this.formulario.get('fim_h').value)
    c.inicio.setMinutes( this.formulario.get('inicio_m').value)
    c.fim.setMinutes(this.formulario.get('fim_m').value)

    c.observacao = this.formulario.get('observacao').value;

    return c;
  }
  
  openAlertDialog(alert: AlertDialog): Observable<any> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: alert
    });
    return dialogRef.afterClosed();
  }


  minTo() {
    
    const validator = (formControl: FormControl) => {
      
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      const inicio = new Date(this.formulario.get('inicio').value);
      const fim = new Date(this.formulario.get('fim').value);
      inicio.setHours( this.formulario.get('inicio_h').value)
      fim.setHours(this.formulario.get('fim_h').value)
      inicio.setMinutes( this.formulario.get('inicio_m').value)
      fim.setMinutes(this.formulario.get('fim_m').value)
      
      if (fim <=  inicio) {
        return { minTo : true };
      }
      return null;
    };
    return validator;
  }
  

}
