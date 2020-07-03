import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userSettings } from '../../../../models/user.model';
import { ApiService } from '../../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  myForm: FormGroup;
  newSettings: userSettings;
  isSpinnerVisible = false;

  constructor(
    private apiServices: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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
    }, () => {
      this.isSpinnerVisible = false;
      this.dialog.closeAll();
    });
  }

  saveUser() {
    const settings = this.myForm.value;
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
    this.apiServices.setUserSettings(this.newSettings).subscribe((data) => {
      this.openSnackBar('Настройки изменены', 'Success');
      return data;
    }, error => {
      this.openSnackBar(error.error, 'Connection error');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
