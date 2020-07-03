import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { LocalDataService } from '../../../../shared/services/local-data.service';
import { UserBlockService } from '../../../../shared/services/user-block.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  stream: Subscription;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localData: LocalDataService,
    private userBlockService: UserBlockService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.auth.setToken(null);
    this.userBlockService.setUser(null);
    this.localData.deleteUser();
    this.localData.clearAuthData();

    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        this.snackBar.open('Now u can login with your credential', 'Success', {
          duration: 5000,
        });
      } else if (params.accessDenied) {
        this.snackBar.open('Login first', 'Access Denied', {
          duration: 5000,
        });
      } else if (params.sessionFailed) {
        this.snackBar.open('Please login again', 'Session expired', {
          duration: 5000,
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
    this.snackBar.dismiss();
  }

  login() {
    this.isLoading = true;
    this.formLogin.disable();
    this.stream = this.auth.login(this.formLogin.value).subscribe(
      (res) => {
        this.localData.setUser(res);
        this.userBlockService.setUser(res);
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error => {
        this.formLogin.enable();
        this.isLoading = false;
        this.snackBar.open(error.error, 'Connection error', {
          duration: 5000,
        });
      }
    );
  }
}
