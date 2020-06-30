import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteListItemComponent } from './components/note-list-item/note-list-item.component';
import { NoteEdtDialogComponent } from './components/note-edt-dialog/note-edt-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';
import { NgMaterialModule } from './NgMaterialModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { NoteSortDialogComponent } from './components/note-sort-dialog/note-sort-dialog.component';
import { LoginComponent } from './components/login/login.component';
//import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteListComponent,
    NotesComponent,
    NoteListItemComponent,
    NoteEdtDialogComponent,
    HeaderComponent,
    NoteSortDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //HttpClientModule,
    NgMaterialModule,
    ReactiveFormsModule,
    /*RouterModule.forRoot([
      {path:'', redirectTo:'',pathMatch:'full'}
    ]),*/

    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'quick-notes'),
    AngularFirestoreModule,     // Only required for database features
    MatSelectModule,
  ],
  providers: [
    NoteService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NoteEdtDialogComponent]
})
export class AppModule { }
