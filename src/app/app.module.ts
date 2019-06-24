import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatButtonModule, MatToolbarModule,MatTableModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaEditarComponent } from './agenda-editar/agenda-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsCompromissoDialogComponent } from './details-compromisso-dialog/details-compromisso-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgendaComponent,
    AgendaEditarComponent,
    DetailsCompromissoDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DetailsCompromissoDialogComponent,
    AlertDialogComponent
  ],
  providers: [
    MatDatepickerModule, 
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
