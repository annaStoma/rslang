import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userSettings } from '../../../../models/user.model';
import { ApiServices } from '../../../../shared/services/api.services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  myForm: FormGroup;
  newSettings: userSettings;
  isSpinnerVisible: boolean = false;

  constructor(
    private apiServices: ApiServices,
    private snackBar: MatSnackBar
  ) {
    this.isSpinnerVisible = true;
    this.apiServices.getUserSettings().subscribe(s => {
      this.myForm = new FormGroup({
        wordsPerDay: new FormControl(s.wordsPerDay, Validators.required),
        maxWords: new FormControl(s.optional.maxWords, Validators.required),
        translation: new FormControl(s.optional.translation, Validators.required),
        explantation: new FormControl(s.optional.explantation, Validators.required),
        exampleText: new FormControl(s.optional.exampleText, Validators.required),
        transcription: new FormControl(s.optional.transcription, Validators.required),
        association: new FormControl(s.optional.association, Validators.required),
      });
      this.isSpinnerVisible = false;
    });
  }

  ngOnInit(): void {
  }

  saveUser(settings) {
    this.newSettings = {
      wordsPerDay: +settings.wordsPerDay,
      optional: {
        maxWords: +settings.maxWords,
        translation: settings.translation,
        explantation: settings.explantation,
        exampleText: settings.exampleText,
        transcription: settings.transcription,
        association: settings.association,
      }};
    this.apiServices.setUserSettings(this.newSettings).subscribe((data) => data);
    this.openSnackBar('Настройки изменены', 'Success');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
