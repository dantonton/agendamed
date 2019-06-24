import { Result } from './../model/result';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, take, catchError } from 'rxjs/operators';
import { Compromisso } from '../model/compromisso';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  private readonly headerJson = new HttpHeaders({ 'Content-Type': 'application/json' });
  private readonly apiCompromisso = environment.API + 'Compromissos';
  constructor(
    private http: HttpClient) { }

    
  save(compromisso:Compromisso){
    if(compromisso.id == null){
      compromisso.id = 'cf47a0ce-7ab4-41a1-ba7e-321a06fb6dc1';
      return this.http
      .post<Result>(this.apiCompromisso,
        compromisso,
       { headers: this.headerJson }
       ).pipe(
         take(1)
       );
    }else{
      return this.http
      .put<Result>(this.apiCompromisso + "/"+ compromisso.id,
        compromisso,
       { headers: this.headerJson }
       ).pipe(
         take(1)
       );
    }
    
      
  }

  delete(id) {
    return this.http
      .delete<Result>(this.apiCompromisso + "/"+ id
       ).pipe(
         take(1)
       );
  }

  getByID(id){
    return this.http
      .get<Result>(this.apiCompromisso+"/"+id).pipe(
        map(res=> res.body)
      ); 
  }

  list(){
    return this.http
      .get<Result>(this.apiCompromisso).pipe(
        map(res=> res.body)
      );
      
  }
}
