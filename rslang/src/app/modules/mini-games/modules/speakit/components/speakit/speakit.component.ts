import { Component, OnInit } from '@angular/core';
import { Word } from '../../../../../../shared/interfaces';
import { ApiServices } from '../../../../../../shared/services/api.services';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
})
export class SpeakitComponent implements OnInit {

  words: Word[];

  constructor(private apiService: ApiServices) {
  }

  ngOnInit(): void {
    this.apiService.getWords(0, 0).subscribe(data => {
      this.words = data.slice(10);
    });
  }
}
