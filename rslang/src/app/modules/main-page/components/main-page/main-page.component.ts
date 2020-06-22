import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  games = [
    {
      name: 'Savanna',
      url: 'savanna',
      image: 'assets/savanna.jpg',
    },
    {
      name: 'Speakit',
      url: 'speakit',
      image: 'assets/speakit.jpg',
    },
    {
      name: 'English Puzzle',
      url: 'english-puzzle',
      image: 'assets/english-puzzle.jpg',
    },
    {
      name: 'Sprint',
      url: 'sprint',
      image: 'assets/sprint.jpg',
    },
    {
      name: 'Audio Call',
      url: 'audiocall',
      image: 'assets/audiocall.jpg',
    },
    {
      name: 'Own Game',
      url: 'own-game',
      image: 'assets/own-game.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
