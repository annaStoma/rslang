import { Component, Input, OnInit } from '@angular/core';

interface Game {
  name: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit(): void {}
}
