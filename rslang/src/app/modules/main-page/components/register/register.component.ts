import { Component, OnInit } from '@angular/core';
import { RegExpString } from '../../../../common/regexp-string';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  symbols = '+-_@$!%*?&#.,;:[]{}';

  constructor(private validator: RegExpString) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(this.validator.email()),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.pattern(this.validator.password()),
        Validators.required,
      ]),
    });
  }

  register() {}
}
