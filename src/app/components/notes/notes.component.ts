import {Component, OnInit} from '@angular/core';
import {Note} from '../../interfaces/note';
import {NoteService} from '../../services/note.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NoteEdtDialogComponent} from '../note-edt-dialog/note-edt-dialog.component';
import {NoteSortDialogComponent} from '../note-sort-dialog/note-sort-dialog.component'
import { NotExpr } from '@angular/compiler';
import { LoginComponent } from '../login/login.component';

/**
 * Top-level stateful component which handles notes, retrieves them from the API using a service,
 * and shows/hides dialog for adding notes. Acts in response to events from children.
 */
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public _notes: Note[];
  public _allNotes: Note[]=[];
  private readonly SNACKBAR_DELAY: number = 1000;

  private secretKey = 'secretKeyTosecureNotes';

  constructor(
    private _noteService: NoteService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('receivedSK') == this.secretKey)
      this._getAllNotes();
    else
      this.verifyUser()   
  }

  private verifyUser() {
    const dialogRef = this._dialog.open(LoginComponent, {
      height: '200px',
      width: '400px',
      data: {note: {}}
    });
  
    dialogRef.afterClosed()
      .subscribe((result) => {
        if(!result){
          this.verifyUser()
        }
        else if (result.secret == this.secretKey) {
          this._getAllNotes();
          localStorage.setItem('receivedSK', 'secretKeyTosecureNotes');
        }
        else{
          this.verifyUser()
        }
      })
  }
  /**
   * Delegates to the NoteService to retrieve the list of notes from the server.
   * @private
   */
  private _getAllNotes(): void {
    this._noteService.getAllNotes()
      .subscribe((notes) => {
          this._notes = notes;
        },
        (error) => {
          this._snackBar.open('There was a problem retrieving notes from the server', 'Ok', {duration: this.SNACKBAR_DELAY});
          console.log('Error retrieving notes', error);
        });
  }

  /**
   * Called when onAddClick event emmitted by the header. Shows the add note dialog.
   * @private
   */
  public _onAddClick(): void {
    const dialogRef = this._dialog.open(NoteEdtDialogComponent, {
      height: '500px',
      width: '700px',
      data: {note: {}}
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        const note: Note = {
          title: result.title,
          content: result.content,
          category: result.category,
          createdOn: Date.now()
        };
        this._noteService.addNote(note)
          .subscribe((added: Note) => {
            console.log('added note', {added});
            this._snackBar.open('Note added.', 'Ok', {duration: this.SNACKBAR_DELAY});
            this._getAllNotes();
          }, (error: any) => {
            console.log('error adding note', {error});
            this._snackBar.open('There was a problem adding the note.');
          });
      });
  }

  public _onSortClick(): void {
    const dialogRef = this._dialog.open(NoteSortDialogComponent, {
      height: '200px',
      width: '300px',
      data: {note: {}}
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        if(result.category == 'All')
          this._getAllNotes();
        else {
          if (this._allNotes.length == 0)
            this._allNotes = this._notes;
          this._notes = [];
          for (let note of this._allNotes) {
            if (note.category == result.category)
              this._notes.push(note)
          }
        }
      });
  }
 
}
