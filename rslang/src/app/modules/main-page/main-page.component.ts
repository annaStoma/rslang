import { Component, OnInit } from '@angular/core';
import { Games, GAMES } from './Game';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  games: Games = GAMES;
  constructor(private router: Router, private accountService: AccountService) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}
}
