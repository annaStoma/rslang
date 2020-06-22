import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../../../services/words.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { userSettings } from '../../../../models/user.model';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  myForm: FormGroup;
  newSettings: userSettings;

  constructor(
    private wordsService: WordsService,
    private userDataService: UserDataService
  ) {
    this.myForm = new FormGroup({
      wordsPerDay: new FormControl(20, Validators.required),
      maxWords: new FormControl(25, Validators.required),
      translation: new FormControl(false, Validators.required),
      explantation: new FormControl(true, Validators.required),
      exampleText: new FormControl(false, Validators.required),
      transcription: new FormControl(false, Validators.required),
      association: new FormControl(false, Validators.required),
    });

    this.newSettings = {
      wordsPerDay: this.myForm.value.wordsPerDay,
      optional: {
        maxWords: this.myForm.value.maxWords,
        translation: this.myForm.value.translation,
        explantation: this.myForm.value.explantation,
        exampleText: this.myForm.value.exampleText,
        transcription: this.myForm.value.transcription,
        association: this.myForm.value.association,
      },
    };
  }

  ngOnInit(): void {}

  // async getUserSettings(): Promise<any> {
  //   const id = await this.userDataService.getUserId;
  //   const token = await this.userDataService.getUserToken;
  //  const res = await this.wordsService.getSettings(id, token)
  //     .subscribe(data => console.log(data));
  //  return res;
  // }

  saveUser(settings) {
    this.newSettings = {
      wordsPerDay: settings.wordsPerDay,
      optional: {
        maxWords: settings.maxWords,
        translation: settings.translation,
        explantation: settings.explantation,
        exampleText: settings.exampleText,
        transcription: settings.transcription,
        association: settings.association,
      },
    };
    this.wordsService
      .setSettings(
        this.userDataService.getUserId,
        this.userDataService.getUserToken,
        this.newSettings
      )
      .subscribe((data) => data);
  }
}
