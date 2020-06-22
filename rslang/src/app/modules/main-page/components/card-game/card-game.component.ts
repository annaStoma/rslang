import { Component, Input } from '@angular/core';
import { Game } from '../../../../shared/interfaces';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent {
  @Input() game: Game;
}
