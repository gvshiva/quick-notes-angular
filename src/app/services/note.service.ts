import {Injectable} from '@angular/core';
import {Observable, defer} from 'rxjs';
import {Note} from '../interfaces/note';
//import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from "@angular/fire/firestore";
//import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { tap,catchError, map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notesRef: AngularFireList<any>;      // Reference to notes list, Its an Observable
  //readonly API_URL = environment.apiUrlRoot + '/notes';

  constructor(/*private _http: HttpClient*/ private db: AngularFireDatabase, protected firestore: AngularFirestore) {
  }


  public getAllNotes(): Observable<Note[]> {
    return this.firestore.collection<Note>('notes').valueChanges()
    /*this.notesRef = this.db.list('notes');
    return this.notesRef as Observable<Note[]>;
    //return this._http.get(this.API_URL) as Observable<Note[]>;*/
  }
  //const id = this.firestore.createId();
  //const doc = this.firestore.collection('notes').doc(id).get();

  public addNote(note: Note){
    const id = this.firestore.createId();
    //this.firestore.collection<Note>('notes').doc(id).set(note, {merge: true})
    //.pipe(map(response => JSON.stringify(response)));

    const promToOb = new Promise<Note>((resolve, reject) =>{
      this.firestore
          .collection("notes")
          .add(note)
          .then(res => {}, err => reject(err));
  });

  return from(promToOb);

    //return defer(() => this.firestore.collection<Note>('notes').doc(id).set(note, {merge: true}));
    //return this.firestore.collection<Note>("notes").add(note);
    /*.then(res => {}, err => reject(err));
    return this.firestore.collection<Note>('notes').add(note)
    //const id = this.firestore.createId();
    //return this.firestore.collection.set(Object.assign({}, { id }, note)).then()
    //return this._http.post(this.API_URL, note) as Observable<Note>;
    return new Promise<Note[]>((resolve, reject) =>{
      this.firestore
          .collection("notes")
          .add(note)
          .then(res => {}, err => reject(err));
  });*/
  }

  /*public AddUser(note: Note) {
    this.notesRef.push({
      id: note.id,
      title: note.title,
      content: note.content,
      category: note.category
    })*/
}
