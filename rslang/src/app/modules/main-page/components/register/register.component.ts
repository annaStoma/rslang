import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

import { RegExpString } from '../../../../common/regexp-string';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('errorTooltip') errorTooltip: MatTooltip;

  DEFAULT_ERROR_MESSAGE = 'Something went wrong';
  formRegister: FormGroup;
  symbols = '+-_@$!%*?&#.,;:[]{}';
  stream: Subscription;
  emailTooltipText = 'E-mail must be format mymail@mydomain.com';
  passwordTooltipText = `Password must be minimum 8 characters and  contain one uppercase, one lowercase letter, one number digit and one special character ${this.symbols}`;
  errorTooltipText = this.DEFAULT_ERROR_MESSAGE;
  isShowTooltipEmail = false;
  isShowTooltipPassword = false;
  isShowTooltipError = true;

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
    this.isShowTooltipError = true;

    this.stream = this.auth.register(this.formRegister.value).subscribe(
      (user) => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      },
      (err) => {
        this.isShowTooltipError = false;
        this.formRegister.enable();
        this.errorTooltipText = err.error;

        timer(0).subscribe(() => {
          this.errorTooltip.show();
        });

        timer(5000).subscribe(() => {
          this.isShowTooltipError = true;
          this.errorTooltipText = this.DEFAULT_ERROR_MESSAGE;
        });
      }
    );
  }

  emailInput() {
    this.isShowTooltipEmail = !this.formRegister.get('email')?.errors?.pattern;
  }

  passwordInput() {
    this.isShowTooltipPassword = !this.formRegister.get('password')?.errors?.pattern;
  }
}
