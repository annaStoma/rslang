import { Component, OnInit } from '@angular/core';
import { Games, GAMES } from './Game';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  games: Games = GAMES;
  constructor() {}

  ngOnInit(): void {}

}
