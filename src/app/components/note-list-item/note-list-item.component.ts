import {Component, Input} from '@angular/core';
import {Note} from '../../interfaces/note';

/**
 * Presentational component representing a single note in the list.
 */
@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent {

  @Input() note: Note;

  public setBg(): string {
    if(this.note.category == 'Personal')
      return '#f3eadb';
    if(this.note.category == 'Business')
      return '#feff9c';
    if(this.note.category == 'Shopping')
      return '#daf8e3';
    if(this.note.category == 'Interests')
    return '#c9df8a';
    if(this.note.category == 'Todo')
    return '#dbc9ef';
    if(this.note.category == 'Others')
    return '#ffd7b5';
  }
}
