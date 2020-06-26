import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../../../../../../shared/services/api.services';

@Component({
  selector: 'app-english-puzzle',
  templateUrl: './english-puzzle.component.html',
  styleUrls: ['./english-puzzle.component.scss'],
})
export class EnglishPuzzleComponent implements OnInit {
  constructor(private apiService: ApiServices) {}

  ngOnInit(): void {
    this.apiService.getUserSettings().subscribe(res => {
      console.log(res)
    })
  }
}
