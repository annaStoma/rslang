import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSettings } from '../../../../models/user.model';
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
  newSettings: UserSettings;
  isSpinnerVisible = false;
  wordsPerDay: number;

  constructor(
    private apiServices: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isSpinnerVisible = true;
    this.apiServices.getUserSettings().subscribe(s => {
      this.wordsPerDay = s.wordsPerDay;
      this.myForm = new FormGroup({
        wordsPerDay: new FormControl(this.wordsPerDay, [
          Validators.required,
          Validators.min(1)
        ]),
        maxWords: new FormControl(s.optional.maxWords, [
          Validators.required,
          (control: AbstractControl) => Validators.min(this.wordsPerDay)(control)
        ]),
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
      }
    };
    this.apiServices.setUserSettings(this.newSettings).subscribe((data) => {
      this.openSnackBar('Настройки изменены', 'Success');
      return data;
    }, error => {
      this.openSnackBar(error.error, 'Error');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setMinValueMaxWords(): void {
    this.wordsPerDay = this.myForm.get('wordsPerDay').value;
    this.myForm.get('maxWords').setValidators([Validators.min(this.wordsPerDay)]);
    this.myForm.get('maxWords').setValue(this.myForm.get('maxWords').value);
    this.myForm.markAllAsTouched();
  }
}
