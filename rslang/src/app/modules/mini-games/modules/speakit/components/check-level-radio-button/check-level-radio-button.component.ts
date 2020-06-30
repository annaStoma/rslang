import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-level-radio-button',
  templateUrl: './check-level-radio-button.component.html',
  styleUrls: ['./check-level-radio-button.component.scss']
})
export class CheckLevelRadioButtonComponent implements OnInit {
  @Input() letter;
  @Input() idx;
  @Input() isNotPlay;

  level = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
