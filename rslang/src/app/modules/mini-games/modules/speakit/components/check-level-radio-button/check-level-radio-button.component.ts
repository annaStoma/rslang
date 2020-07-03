import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-level-radio-button',
  templateUrl: './check-level-radio-button.component.html',
  styleUrls: ['./check-level-radio-button.component.scss']
})
export class CheckLevelRadioButtonComponent {
  @Input() letter;
  @Input() idx;
  @Input() isNotPlay;
  @Input() level;
  @Output() changeLevel = new EventEmitter();

  setLevel(level) {
    this.changeLevel.emit(level);
  }
}
