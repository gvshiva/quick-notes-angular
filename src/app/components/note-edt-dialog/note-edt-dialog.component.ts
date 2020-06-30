import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Note} from '../../interfaces/note';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface NoteFormat {
  value: string;
  viewValue: string;
}
/**
 * Modal dialog shown for adding/editing (not implemented) notes.
 * Uses Angular Material's MatDialog, and Angular Reactive forms for client-side validation.
 */
@Component({
  selector: 'app-note-edt-dialog',
  templateUrl: './note-edt-dialog.component.html',
  styleUrls: ['./note-edt-dialog.component.css'],
})
export class NoteEdtDialogComponent {

  noteForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(1024),
    ]),
    category: new FormControl('', [
      Validators.required,
    ])
  });  

  notes: NoteFormat[] = [
    {value: 'Personal', viewValue: 'Personal'},
    {value: 'Business', viewValue: 'Business'},
    {value: 'Interests', viewValue: 'Interests'},
    {value: 'Todo', viewValue: 'To do'},
    {value: 'Shopping', viewValue: 'Shopping'},
    {value: 'Others', viewValue: 'Others'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Note) {
  }


}
