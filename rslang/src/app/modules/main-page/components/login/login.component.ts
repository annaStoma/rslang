import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      name: new FormControl({}),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  login() {}
}
