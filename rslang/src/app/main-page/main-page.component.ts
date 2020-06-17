import { Component, OnInit } from '@angular/core';
import { games } from './Game';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  games = games;
  constructor() {}

  ngOnInit(): void {}
}
