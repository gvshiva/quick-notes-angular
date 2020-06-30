import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Note} from '../../interfaces/note';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  noteForm = new FormGroup({
    secret: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });  

  constructor() { }

  ngOnInit(): void {
  }

}
