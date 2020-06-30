import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Note} from '../../interfaces/note';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface NoteFormat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-note-sort-dialog',
  templateUrl: './note-sort-dialog.component.html',
  styleUrls: ['./note-sort-dialog.component.css']
})
export class NoteSortDialogComponent implements OnInit {

  noteForm = new FormGroup({
    category: new FormControl('', [])
  });  

  notes: NoteFormat[] = [
    {value: 'Personal', viewValue: 'Personal'},
    {value: 'Business', viewValue: 'Business'},
    {value: 'Interests', viewValue: 'Interests'},
    {value: 'Todo', viewValue: 'To do'},
    {value: 'Shopping', viewValue: 'Shopping'},
    {value: 'Others', viewValue: 'Others'},
    {value: 'All', viewValue: 'All'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Note) {
  }

  ngOnInit(): void {
  }

}
