import { Component } from '@angular/core';
import { Games } from '../../../../shared/interfaces';
import { games } from '../../../../common/games';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  games: Games = games;
}
