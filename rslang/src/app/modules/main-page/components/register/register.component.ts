import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { RegExpString } from '../../../../common/regexp-string';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister: FormGroup;
  symbols = '+-_@$!%*?&#.,;:[]{}';
  stream: Subscription;

  constructor(
    private validator: RegExpString,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      userName: new FormControl('', Validators.required),
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

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }

  register() {
    this.formRegister.disable();
    this.stream = this.auth.register(this.formRegister.value).subscribe(
      (user) => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      },
      (err) => {
        this.formRegister.enable();
      }
    );
  }
}
