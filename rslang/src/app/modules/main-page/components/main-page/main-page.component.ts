import { Component, OnInit } from '@angular/core';
import { Games } from '../../../../shared/interfaces';
import { games } from '../../../../common/games';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{
  games: Games = games;

  constructor(private titleService: Title){}

  ngOnInit(): void {
    this.titleService.setTitle('Rslang');
  }
}
