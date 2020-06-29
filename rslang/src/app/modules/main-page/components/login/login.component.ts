import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { LocalDataService } from '../../../../shared/services/local-data.service';
import { UserBlockService } from '../../../../shared/services/user-block.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  stream: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localData: LocalDataService,
    private userBlockService: UserBlockService
  ) {}

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
      if (params['registered']) {
        // need to add material tooltip to the login form TODO
        // documentation https://material.angular.io/components/tooltip/overview
        // example: https://stackblitz.com/angular/dnbyppdneqdq?file=src%2Fapp%2Ftooltip-auto-hide-example.ts
        console.log('welcome');
      } else if (params['accessDenied']) {
        //need to add material tooltip to the login form TODO
        console.log('access denied');
      } else if (params['sessionFailed']) {
        //need to add material tooltip to the login form TODO
        console.log('sing in again');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }

  login() {
    this.formLogin.disable();
    this.stream = this.auth.login(this.formLogin.value).subscribe(
      (res) => {
        this.localData.setUser(res);
        this.userBlockService.setUser(res);
        this.router.navigate(['/']);
      },
      (err) => {
        this.formLogin.enable();
        //need to add material tooltip to the login form TODO
      }
    );
  }
}
