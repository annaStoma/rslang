import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

import { RegExpString } from '../../../../common/regexp-string';
import { AuthService } from '../../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('errorTooltip') errorTooltip: MatTooltip;

  formRegister: FormGroup;
  symbols = '+-_@$!%*?&#.,;:[]{}';
  stream: Subscription;
  emailTooltipText = 'E-mail must be format mymail@mydomain.com';
  passwordTooltipText = `Password must be minimum 8 characters and  contain one uppercase, one lowercase letter, one number digit and one special character ${this.symbols}`;
  isShowTooltipEmail = false;
  isShowTooltipPassword = false;
  isLoading = false;

  constructor(
    private validator: RegExpString,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.snackBar.dismiss();
  }

  register() {
    this.isLoading = true;
    this.formRegister.disable();

    this.stream = this.auth.register(this.formRegister.value).subscribe(
      (user) => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      },
      error => {
        this.isLoading = false;
        this.formRegister.enable();

        this.snackBar.open(`${error?.error || 'Something went wrong'}`, 'Error', {
          duration: 5000,
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
