import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speakit',
  templateUrl: './speakit.component.html',
  styleUrls: ['./speakit.component.scss'],
})
export class SpeakitComponent implements OnInit {

  words = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
  }

  ngOnInit(): void {
  }
}
